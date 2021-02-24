'use strict'

/*ARTICLES*/
function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  console.log('Link was clicked!', event);

  /* (działa) remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* (działa) add class 'active' to the clicked link */

  this.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  /* --> chyba jest błąd w klasie, nie usuwa 'active'*/

  const activeArticles = document.querySelectorAll('.post active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* (poprawiony - czy działa?) get 'href' attribute from the clicked link */

  const articleSelector = element.getAttribute('href');

  console.log('get href is working!', articleSelector);

  /* (czy działa?) find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = element.querySelector('href');

  console.log('find the correct article is working!', targetArticle);
 
  /* (czy działa?) add class 'active' to the correct article */

  this.targetArticle.add('active');

  console.log('add class active to correct article is working!', targetArticle);
 
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}




