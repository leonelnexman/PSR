/*
 * css style var(--vh)
 */
export const vhFix = () => {
    if (!(!!window.MSInputMethodContext && !!document.documentMode)) {
        let vh = window.innerHeight;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            vh = window.innerHeight;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }
};


let scrollDiv;

/**
 * Get scrollbar width for modal
 * @returns {number} Scrollbar width
 */
export const getScrollbarWidth = () => {
    const width = window.innerWidth - document.documentElement.clientWidth;

    if (width || document.documentElement.clientHeight >= document.documentElement.offsetHeight) {
        return width;
    }

    // Document doesn't have a scrollbar, possibly because there is not enough content so browser doesn't show it
    if (!scrollDiv) {
        scrollDiv = document.createElement('div');
        scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px';
        document.body.appendChild(scrollDiv);
    }

    return scrollDiv.offsetWidth - scrollDiv.clientWidth;
};

/**
 * Pluralization
 */
export const plural = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
