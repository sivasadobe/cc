import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { setMobileOS, getMobileOperatingSystem } from '../../../creativecloud/blocks/cc-app-banner/cc-app-banner.js';
import { waitForElement } from '../../helpers/waitfor.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const { default: init } = await import(
  '../../../creativecloud/blocks/cc-app-banner/cc-app-banner.js'
);

describe('cc-app-banner iOS block', () => {
  const block = document.body.querySelector('.cc-app-banner');
  before(() => {
    setMobileOS('iOS');
    init(block);
  });

  it('Has .cc-app-banner-icon', async () => {
    await waitForElement('.cc-app-banner-icon');
    const icon = document.body.querySelector('.cc-app-banner-icon');
    expect(icon).to.exist;
  });

  it('Has .cc-app-banner-description', async () => {
    await waitForElement('.cc-app-banner-description');
    const desc = document.body.querySelector('.cc-app-banner-description');
    expect(desc).to.exist;
  });

  it('Has .cc-app-banner-details', async () => {
    await waitForElement('.cc-app-banner-details');
    const node = document.body.querySelector('.cc-app-banner-details');
    expect(node).to.exist;
  });

  it('Has .cc-app-banner-stars', async () => {
    await waitForElement('.cc-app-banner-stars');
    const node = document.body.querySelector('.cc-app-banner-stars');
    expect(node).to.exist;
  });

  it('Has .cc-app-banner-title', async () => {
    await waitForElement('.cc-app-banner-title');
    const node = document.body.querySelector('.cc-app-banner-title');
    expect(node).to.exist;
  });

  it('Has .cc-app-banner-reviews', async () => {
    await waitForElement('.cc-app-banner-reviews');
    const node = document.body.querySelector('.cc-app-banner-reviews');
    expect(node).to.exist;
  });

  it('Can close the banner ', async () => {
    const node = document.body.querySelector('.cc-app-banner-details');
    node.click();
    const node1 = document.body.querySelector('.cc-app-banner-details');
    expect(node1).not.to.exist;
  });
});

document.body.innerHTML = '';
document.body.innerHTML = await readFile({ path: './mocks/body.html' });

describe('app-banner unknown block', () => {
  const block = document.body.querySelector('.cc-app-banner');
  before(() => {
    setMobileOS('unknown');
    init(block);
  });

  it('Has no .cc-app-banner-icon', async () => {
    const icon = block.querySelector('.cc-app-banner-icon');
    expect(icon).to.be.null;
  });
});

document.body.innerHTML = '';
document.body.innerHTML = await readFile({ path: './mocks/body.html' });

describe('CC app-banner Andriod block', () => {
  const block = document.body.querySelector('.cc-app-banner');
  before(() => {
    setMobileOS('Android');
    init(block);
  });

  it('Has .cc-app-banner-icon', async () => {
    await waitForElement('cc-.app-banner-icon');
    const icon = document.body.querySelector('.cc-app-banner-icon');
    expect(icon).to.exist;
  });

  it('Has .cc-app-banner-description', async () => {
    await waitForElement('.cc-app-banner-description');
    const desc = document.body.querySelector('.cc-app-banner-description');
    expect(desc).to.exist;
  });

  it('Has .cc-app-banner-details', async () => {
    await waitForElement('.cc-app-banner-details');
    const node = document.body.querySelector('.cc-app-banner-details');
    expect(node).to.exist;
  });

  it('Has .cc-app-banner-stars', async () => {
    await waitForElement('.cc-app-banner-stars');
    const node = document.body.querySelector('.cc-app-banner-stars');
    expect(node).to.exist;
  });

  it('Has .cc-app-banner-title', async () => {
    await waitForElement('.cc-app-banner-title');
    const node = document.body.querySelector('.cc-app-banner-title');
    expect(node).to.exist;
  });

  it('Has .cc-app-banner-reviews', async () => {
    await waitForElement('.cc-app-banner-reviews');
    const node = document.body.querySelector('.cc-app-banner-reviews');
    expect(node).to.exist;
  });

  it('Can close the banner ', async () => {
    const node = document.body.querySelector('.cc-app-banner-details');
    node.click();
    const node1 = document.body.querySelector('.cc-app-banner-details');
    expect(node1).not.to.exist;
  });
});

describe('get mobile operating system', () => {
  it('should return "Windows Phone" for Windows Phone user agent', () => {
    const userAgent = 'Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 640 LTE) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/13.10586\n';
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      configurable: true,
    });
    expect(getMobileOperatingSystem()).to.be.equal('Windows Phone');
  });
  it('should return "Android" for Android user agent', () => {
    const userAgent = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.66 Mobile Safari/537.36\n';
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      configurable: true,
    });
    expect(getMobileOperatingSystem()).to.be.equal('Android');
  });
  it('should return "iOS" for iOS user agent', () => {
    const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1\n';
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      configurable: true,
    });
    expect(getMobileOperatingSystem()).to.be.equal('iOS');
  });
  it('should return "unknown" for unknown user agent', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36\n';
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      configurable: true,
    });
    expect(getMobileOperatingSystem()).to.be.equal('unknown');
  });
});
