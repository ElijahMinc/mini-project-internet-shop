class Preload {
   constructor(preloadPage) {
      this.preloadPage = document.querySelector(preloadPage);
      this.#render();
   }
   removeRender() {
      this.preloadPage.classList.add('hidden');
      this.preloadPage.innerHTML = null;
   }
   #render() {
      let preloadHtml = `
      <img src="img/preload.svg" alt="preload">
      `
      this.preloadPage.innerHTML = preloadHtml;
   }
}


export default Preload;