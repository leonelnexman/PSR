import lightGallery from 'lightgallery';
import lgVideo from 'lightgallery/plugins/video';

import lgThumbnail from 'lightgallery/plugins/thumbnail';


const $dynamicGallery = document.querySelectorAll('.js-gallery-videos');

if ($dynamicGallery) {

    const leftButton = `<div class="button button--fill button--round">
            <div class="button__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="prev">
<g id="icons/black/back">
<path id="Path 5" d="M14.5856 11.9999L9.99985 7.41414C9.60933 7.02361 9.60932 6.39045 9.99985 5.99992C10.3904 5.6094 11.0235 5.6094 11.4141 5.99992L17.4141 11.9999L11.4141 17.9999C11.0235 18.3904 10.3904 18.3904 9.99985 17.9999C9.60932 17.6094 9.60932 16.9762 9.99985 16.5857L14.5856 11.9999Z" fill="white"/>
</g>
</g>
</svg>
</div></div>`

    const rightButton = `<div class="button button--fill button--round">
            <div class="button__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="prev">
<g id="icons/black/back">
<path id="Path 5" d="M14.5856 11.9999L9.99985 7.41414C9.60933 7.02361 9.60932 6.39045 9.99985 5.99992C10.3904 5.6094 11.0235 5.6094 11.4141 5.99992L17.4141 11.9999L11.4141 17.9999C11.0235 18.3904 10.3904 18.3904 9.99985 17.9999C9.60932 17.6094 9.60932 16.9762 9.99985 16.5857L14.5856 11.9999Z" fill="white"/>
</g>
</g>
</svg>
</div></div>`

    const closeIcon = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.1527 10.8596L0.0764695 20.9359L0.783576 21.643L10.8598 11.5668L20.9361 21.643L21.6432 20.9359L11.5669 10.8596L21.6432 0.783363L20.9361 0.0762559L10.8598 10.1525L0.783579 0.0762843L0.0764722 0.783391L10.1527 10.8596Z" fill="white"/>
</svg>`

    $dynamicGallery.forEach(gallery => {

      const dynamicGallery = lightGallery(gallery, {
            autoplayFirstVideo: true,
            autoplayVideoOnSlide: true,
            selector: '.js-gallery-video',
            pager: false,
            plugins: [lgVideo],
            addClass: "lg-common",
            zoomFromOrigin: false,
            mobileSettings: {
                controls: true,
                showCloseIcon: true,
                rotate: false
            },
            prevHtml: leftButton,
            nextHtml: rightButton,
            download: false,
            counter: false,
        });

        dynamicGallery.$container.selector.querySelector('.lg-close').insertAdjacentHTML("beforeend", closeIcon);
    })
}


const $galleries = document.querySelectorAll('.lightgallery');

if ($galleries) {
    $galleries.forEach(gallery => {
        const lightGalleryInstance = lightGallery(gallery, {
            pager: false,
            addClass: "lg-common",
            zoomFromOrigin: false,
            mobileSettings: {
                controls: true,
                showCloseIcon: true,
                rotate: false
            },
            download: false,
            counter: false,
        });
    });
}



