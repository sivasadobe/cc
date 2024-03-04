const { default: defineDeviceByScreenSize } = await import('../../scripts/decorate.js');

function handleTouchDevice(mediaContainer, device) {
  if (device !== 'DESKTOP') {
    let tapCount = 0;
    mediaContainer.querySelector('a').addEventListener('click', async (e) => {
      e.preventDefault();
      tapCount += 1;
      if (tapCount === 1) {
        mediaContainer.querySelector('p').style.display = 'block';
        setTimeout(() => {
          tapCount = 0;
          mediaContainer.querySelector('p').style.display = 'none';
        }, 2000);
      } else if (tapCount === 2) {
        window.location.href = mediaContainer.querySelector('a').href;
      }
    });
  }
}

function createImageLayout(allMedia, createTag, spans, media) {
  const maxChar = {
    'span-4': 103,
    'span-6': 181,
    'span-8': 273,
    'span-12': 417,
  };
  const gridDiv = createTag('div', { class: 'grid-container' });
  [...allMedia].forEach((img, i) => {
    const spanWidth = spans[i] ? spans[i] : 'span-4';
    img.classList.add(`ff-grid-${spanWidth.trim().replace(' ', '-')}`);
    const prompt = img.querySelector('p');
    const maxChars = maxChar[spanWidth];
    if (prompt.textContent.length > maxChars) {
      prompt.textContent = prompt.textContent.slice(0, maxChars);
    }
    gridDiv.appendChild(img);
  });
  media.appendChild(gridDiv);
}

function getImgSrc(pic, viewport = '') {
  let source = '';
  if (viewport === 'mobile') source = pic.querySelector('source[type="image/webp"]:not([media])');
  else source = pic.querySelector('source[type="image/webp"][media]');
  return source.srcset;
}

async function createEmbellishment(allP, media, ic, mode) {
  const { createPromptField, createEnticement } = await import('../interactive-elements/interactive-elements.js');
  const [promptText, buttonText, link] = allP[4].innerText.split('|');
  const fireflyPrompt = await createPromptField(`${promptText}`, `${buttonText}`, 'ff-masonary');
  fireflyPrompt.classList.add('ff-masonary-prompt');
  const promptButton = fireflyPrompt.querySelector('#promptbutton');
  promptButton.addEventListener('click', async () => {
    window.location.href = link;
  });

  const enticementText = allP[0].textContent.trim();
  const enticementIcon = allP[0].querySelector('a').href;
  const enticementDiv = await createEnticement(`${enticementText}|${enticementIcon}`, mode);
  media.appendChild(enticementDiv);
  media.appendChild(fireflyPrompt);
  ic.appendChild(media);
}

async function processMasonryMedia(ic, miloUtil, allP, enticementMode, mediaDetail, device) {
  const allMedia = [];
  const media = miloUtil.createTag('div', { class: 'media grid-layout' });
  for (let i = 0; i < mediaDetail.img.length; i++) {
    const mediaContainer = miloUtil.createTag('div', { class: 'image-container' });
    const a = miloUtil.createTag('a', { href: `${mediaDetail.href[i]}` });
    a.style.backgroundImage = `url(${mediaDetail.imgSrc[i]})`;
    const imgPrompt = miloUtil.createTag('p', { class: 'image-content' }, mediaDetail.prompt[i].trim());
    a.appendChild(imgPrompt);
    mediaContainer.appendChild(a);
    allMedia.push(mediaContainer);
    handleTouchDevice(mediaContainer, device);
  }
  createImageLayout(allMedia, miloUtil.createTag, mediaDetail.spans, media);
  createEmbellishment(allP, media, ic, enticementMode);
}

function setImgAttrs(a, imagePrompt, src, prompt, href) {
  a.style.backgroundImage = `url(${src})`;
  imagePrompt.innerText = prompt;
  a.href = href;
}

function handleClick(a, mediaDetail, imagePrompt) {
  const currIndex = mediaDetail.index;
  const nextIndex = (currIndex + 1) % mediaDetail.imgSrc.length;
  const src = mediaDetail.imgSrc[nextIndex];
  const prompt = mediaDetail.prompt[nextIndex];
  const href = mediaDetail.href[nextIndex];
  setImgAttrs(a, imagePrompt, src, prompt, href);
  mediaDetail.index = nextIndex;
  return nextIndex;
}

function startAutocycle(a, imagePrompt, autoCycleConfig, mediaDetail, interval) {
  autoCycleConfig.autocycleInterval = setInterval(() => {
    handleClick(a, mediaDetail, imagePrompt);
    if (mediaDetail.index === mediaDetail.image.length - 1) {
      clearInterval(autoCycleConfig.autocycleInterval);
    }
  }, interval);
}

function processMobileMedia(ic, miloUtil, allP, mode, mediaDetail, device) {
  const mediaMobile = miloUtil.createTag('div', { class: 'media mobile-only' });
  const autoCycleConfig = { autocycleInterval: null };
  const mediaContainer = miloUtil.createTag('div', { class: 'image-container' });
  const a = miloUtil.createTag('a', { href: `${mediaDetail.href[mediaDetail.index]}` });
  a.style.backgroundImage = `url(${mediaDetail.imgSrc[mediaDetail.index]})`;
  const imgHoverText = miloUtil.createTag('p', { class: 'image-content' }, allP[2].innerText.trim());
  const imgPrompt = miloUtil.createTag('p', { class: 'image-prompt' }, mediaDetail.prompt[mediaDetail.index].trim());
  a.appendChild(imgHoverText);
  mediaContainer.appendChild(a);
  mediaContainer.appendChild(imgPrompt);
  mediaMobile.appendChild(mediaContainer);
  ic.appendChild(mediaMobile);
  setTimeout(() => {
    const aTag = ic.querySelector('.mobile-only a');
    const imagePrompt = ic.querySelector('.mobile-only .image-prompt');
    if (device === 'MOBILE') {
      startAutocycle(aTag, imagePrompt, autoCycleConfig, mediaDetail, 3000);
    }
  }, 1000);
  createEmbellishment(allP, mediaMobile, ic, mode);
  handleTouchDevice(mediaContainer, device);
}

export default async function setInteractiveFirefly(el, miloUtil) {
  const enticementMode = el.classList.contains('light') ? 'light' : 'dark';
  const ic = el.querySelector('.interactive-container');
  const mediaElements = el.querySelector('.media');
  const allP = mediaElements.querySelectorAll('p:not(:empty)');
  const currentDom = ic.cloneNode(true);
  ic.innerHTML = '';
  const mediaDetail = {
    img: [], imgSrc: [], prompt: [], href: [], index: 0, spans: [],
  };
  const device = defineDeviceByScreenSize();
  [...allP].forEach((s) => {
    if (s.querySelector('picture')) {
      mediaDetail.img.push(s);
      mediaDetail.imgSrc.push(getImgSrc(s));
      const [prompt, href] = allP[[...allP].indexOf(s) + 1].innerText.split('|');
      mediaDetail.prompt.push(prompt);
      mediaDetail.href.push(href);
      mediaDetail.spans.push(s.querySelector('img').getAttribute('alt'));
    }
  });
  processMasonryMedia(ic, miloUtil, allP, enticementMode, mediaDetail, device);
  processMobileMedia(ic, miloUtil, allP, enticementMode, mediaDetail, device);
}
