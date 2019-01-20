const getScrollTop = () => {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    return scrollTop;
}

/**
 * 
 * @param {是否阻止滚动穿透} fidding 
 */
const shouldScroll = (() => {
    let scrollTop
    return (fidding=false) => {
        const bodyDom = document.getElementsByTagName('body')[0];
        if(fidding) {
            scrollTop = getScrollTop();
            bodyDom.style.position = 'fixed';
            bodyDom.style.top = `-${scrollTop}px`;
        }else{
            bodyDom.style.position = 'static';
            window.scrollTo(0,scrollTop);
        }
    }
})()

export default shouldScroll;

