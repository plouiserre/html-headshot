import DeterminateContent from "../../src/dom/determinateContent";

test('Determinate Content in simple div with simple text', async()=>{
    const content = 'Hello World';
    const openTag = '<div class="vector-settings">';
    const closedTag = '</div>';
    const html = `${openTag}${content}${closedTag}`;

    const determinateContent = new DeterminateContent(openTag, closedTag);
    const result = determinateContent.calculate(html);

    expect(JSON.stringify(result)).toBe(JSON.stringify(content));
});

test('Determinate Content in simple div with simple text in p tags', async()=>{
    const content = '<p>Hello World</p>';
    const openTag = '<div class="vector-settings">';
    const closedTag = '</div>';
    const html = `${openTag}${content}${closedTag}`;

    const determinateContent = new DeterminateContent(openTag, closedTag);
    const result = determinateContent.calculate(html);

    expect(JSON.stringify(result)).toBe(JSON.stringify(content));
});

test('Determinate Content with multiple div', async()=>{
    const content = '<div class="vector-column-start"><div class="vector-main-menu-container"><div id="mw-navigation"><nav id="mw-panel" class="vector-main-menu-landmark" aria-label="Site"><div id="vector-main-menu-pinned-container" class="vector-pinned-container"></div></nav></div></div></div>';
    const openTag = '<div id="siteNotice">';
    const closedTag = '</div>';
    const html = `${openTag}${content}${closedTag}`;

    const determinateContent = new DeterminateContent(openTag, closedTag);
    const result = determinateContent.calculate(html);

    expect(JSON.stringify(result)).toBe(JSON.stringify(content));
});