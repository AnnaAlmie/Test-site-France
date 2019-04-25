$(document).ready(function () {
    findVideos();
    tab();
    heightAside();

});
$(window).resize(function() {
    heightAside();
});

function heightAside() {
    setTimeout(function () {
        $('aside').css('height', $('main').height() + 'px');
    }, 1000)
}
// VIDEO
function findVideos() {
    let videos = document.querySelectorAll('.video__youtube');

    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }
}

function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__media');
    let button = video.querySelector('.video__button');
    let id = parseMediaURL(media);

    video.addEventListener('click', () => {
        let iframe = createIframe(id);

        link.remove();
        button.remove();
        video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
}

function parseMediaURL(media) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
}

function createIframe(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
}

function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
}
// end VIDEO

function tab() {
    $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

    $('.tab ul.tabs li a').click(function (g) {
        var tab = $(this).closest('.tab'),
            index = $(this).closest('li').index();

        tab.find('ul.tabs > li').removeClass('current');
        $(this).closest('li').addClass('current');

        tab.find('.tabs__content').find('div.tabs__item').not('div.tabs__item:eq(' + index + ')').slideUp();
        tab.find('.tabs__content').find('div.tabs__item:eq(' + index + ')').slideDown();

        g.preventDefault();
    } );
}