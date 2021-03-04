'use strict';

/* --- 5.3 ---*/

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  console.log('Link was clicked!', event);

  /* add class 'active' to the clicked link */
  
  this.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  /* --> chyba jest błąd w klasie, nie usuwa 'active'*/

  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  console.log('remove class active from all articles is working!', activeArticles);

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  console.log('get href is working!', articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  console.log('find the correct article is working!', targetArticle);
  
   /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

  console.log('add class active to correct article is working!', targetArticle);

  /* remove class 'active' from all article links  (przeniesione na koniec - bug z modułu 5.4)*/
  const activeLinks = document.querySelectorAll('.titles a.active');
  console.log(activeLinks);

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}


/* --- 5.4 --- */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* (działa) remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
  console.log('remove contents of titlelist is working!', titleList);

  /* (działa) for each article */

  const articles = document.querySelectorAll(optArticleSelector);   // ('.post') - to było wcześniej

  console.log('for each article is working!', articles);

  let html = '';

  for(let article of articles){
  /* get the article id */
    article = document.getAttribute('article');      
    //articleId.getAttribute(id) ?
    //articleId.getElementById()
    console.log('get the article id is working!', article);

    /* find the title element */    //czy ten krok został wykonany poniżej?
    //querySelector do tej pory wykonywaliśmy zawsze na elemencie document
    //ale równie dobrze możemy wykonać tę funkcję na dowolnym elemencie. 
    //Dzięki temu będziemy mogli wyszukać tytuł w konkretnym artykule.

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle +'</span></a></li>';


    /* insert link into titleList (html variable)*/
    //tu robić
    html = html + linkHTML;
    console.log('html' + html);
  } 

  titleList.innerHTML = html;
}

generateTitleLinks();