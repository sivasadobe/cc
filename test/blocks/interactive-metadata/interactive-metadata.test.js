import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

document.body.innerHTML = await readFile({ path: './mocks/interactive-metadata.html' });
const { setLibs } = await import('../../../creativecloud/scripts/utils.js');
const { default: init } = await import('../../../creativecloud/blocks/interactive-metadata/interactive-metadata.js');

describe('interactive metadata', () => {
  let im = null;
  let ib = null;

  before(async () => {
    setLibs('https://milo.adobe.com/libs');
    im = document.querySelector('.interactive-metadata');
    ib = document.querySelector('.marquee');
    await init(im);
  });
  it('interactive metadata should exist', () => {
    console.log(im);
    expect(im).to.exist;
  });
  it('should make the previous block interactive-enabled', () => {
    expect(ib).to.exist;
    expect(ib.classList.contains('interactive-enabled')).to.be.true;
  });
  it('should create a workflow', () => {
    let hasWorkflowClass = false;
    im.classList.forEach((className) => {
      if (className.startsWith('workflow-')) {
        hasWorkflowClass = true;
      }
    });
    expect(hasWorkflowClass).to.be.true;
  });
  it('should render next selector tray', async () => {
    im.dispatchEvent(new CustomEvent('cc:interactive-switch'));
    await new Promise((res) => { setTimeout(() => { res(); }, 200); });
    expect(ib.querySelector('.interactive-holder.step-selector-tray')).to.exist;
  });
  it('should render next crop layer', async () => {
    im.dispatchEvent(new CustomEvent('cc:interactive-switch'));
    await new Promise((res) => { setTimeout(() => { res(); }, 200); });
    expect(ib.querySelector('.interactive-holder.step-crop')).to.exist;
  });
  it('should render next crop layer', async () => {
    im.dispatchEvent(new CustomEvent('cc:interactive-switch'));
    await new Promise((res) => { setTimeout(() => { res(); }, 200); });
    expect(ib.querySelector('.interactive-holder.step-start-over')).to.exist;
  });
  it('should render next generate layer', async () => {
    im.dispatchEvent(new CustomEvent('cc:interactive-switch'));
    await new Promise((res) => { setTimeout(() => { res(); }, 200); });
    expect(ib.querySelector('.interactive-holder.step-generate')).to.exist;
  });
});
