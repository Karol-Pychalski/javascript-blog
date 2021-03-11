'use strict';

// ------------------------------------------- 5.3 -------------------------------------------//

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  /* add class 'active' to the clicked link */
  
  clickedElement.classList.add('active');                     //tu było this zamiast clickedElement

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector)
  
  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

  /* remove class 'active' from all article links  (przeniesione na koniec - bug z modułu 5.4)*/
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
}



// ----------------------------------------- 5.4 ---------------------------------------------//

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
  

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';             //należy to wykonać po wywołaniu stałej; zawartośc titleList zostanie zastąpiona pustym ciągiem (https://developer.mozilla.org/pl/docs/Web/API/Element/innerHTML)

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);   // customSelector z zad. 6.2

  let html = '';

  for(let article of articles){               //article jest iterowany w pętli
  /* get the article id */
    const articleId = article.getAttribute('id'); 

    /* find the title element */  
    //querySelector do tej pory wykonywaliśmy zawsze na elemencie document
    //ale równie dobrze możemy wykonać tę funkcję na dowolnym elemencie. 
    //Dzięki temu będziemy mogli wyszukać tytuł w konkretnym artykule.


    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle +'</span></a></li>';

    /* insert link into titleList (html variable)*/
    html = html + linkHTML;
  } 
  titleList.innerHTML = html;
}

generateTitleLinks();

//przeniesione na koniec bo druga funkcja usuwała listę na której pierwsza wywoływała eventListener (potrzebna jest lista aby to działało)
//dopiero po wygenerowaniu linków można użyć eventListenera
const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}



//--------------------------------------DODAJEMY TAGI DO ARTYKUŁU--------------------------//
//---------------------------------------------- 6.2 --------------------------------------//
//------------------------------------------PIERWSZA FUNKCJA-------------------------------//

const optArticleTagsSelector = '.post-tags .list';

function generateTags(){
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);   //optArticleSelector ma klasę '.post'
  console.info('find all articles: ', articles);

  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);   //czy tu ma być .innerHTML ?
    console.log('loop for every article, I 6.2: ', tagWrapper);
    
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('get tags from data-tags attribute (I 6.2): ', articleTags);

    /* (ok) split tags into array */
    
    const articleTagsArray = articleTags.split(' ');
    console.info('split tags into array (I 6.2): ', articleTagsArray);

    /* (ok) START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      console.info('loop for each tag, I 6.2: ', tag);

      /* (?) generate HTML of the link */
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle +'</span></a></li>';
      const linkHTML = '<li><a href="#tag-' + articleTags + '"><span>' + tag +'</span></a></li>';

      /* (?) add generated code to html variable */
      html = html + linkHTML;
    }
    /* END LOOP: for each tag */
 
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();


//---------------------------------------------- 6.2 --------------------------------------//
//------------------------------------------DRUGA FUNKCJA----------------------------------//

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('make a new constant clickedElement (II 6.2): ', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('make a new constant href (II 6.2): ', href);

  /* (ok) make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');            //zamieni '#tag-' na pusty ciąg znaków
  console.log('make a new constant tag (II 6.2): ', tag);

  /* find all tag links with class active (Znajdowanie linków do tagów)*/
  const tagLink = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('find all tag links with class active (II 6.2): ', tagLink);

  /* START LOOP: for each active tag link */
  for(let tagLink of tagLinks){               //było: let articleTag of articleTags
    /* remove class active */
    tagLink.classList.remove('active');
    console.log('loop for each active tag link, II 6.2: ', tagLink);

          //z zad. 5.3: remove class 'active' from all article links
          //1. const activeLinks = document.querySelectorAll('.titles a.active');
          //2. for(let activeLink of activeLinks){
          //     activeLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log('find all tag links with href attribute (II 6.2):', tagHref);

  /* START LOOP: for each found tag link */
  for(let tagHref of tagHrefs){
    /* add class active */
    tagHref.classList.add('active');
    console.log('loop for each found tag link, II 6.2: ', tagHref);
  }
  /* END LOOP: for each found tag link */

  /* (ok) execute function "generateTitleLinks" (z punktu 5.4) with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

//---------------------------------------------- 6.2 ----------------------------------------//
//------------------------------------------TRZECIA FUNKCJA----------------------------------//

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href="' + href + '"]');    //jak powiązać to href z tym z funkcji powyżej? czy to ma być inaczej zrobione?
  console.log('find all links to tags (III 6.2): ', links);

  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    console.log('loop for ech link, III 6.2: ', link);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();



//-----------------------------------DODANIE AUTORA DO ARTYKUŁU------------------------------//
//---------------------------------------------- 6.2 ----------------------------------------//
//------------------------------------------CZWARTA FUNKCJA----------------------------------//

const optArticleAuthorSelector = ".post-author";

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleAuthorSelector);

  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleTagsSelector);   //czy tu ma być .innerHTML ?
    console.log('loop for every article, IV 6.2: ', authorWrapper);
  
    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('get tags from data-tags attribute, IV 6.2: ', articleAuthor);

    /* (?) generate HTML of the link */
    const linkHTML = '<li><a href="#' + articleAuthor + '"><span>' + '</span></a></li>';      // co po + ?

    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle +'</span></a></li>';
    //const linkHTML = '<li><a href="#tag-' + articleTags + '"><span>' + tag +'</span></a></li>';

     /* (?) add generated code to html variable */
    html = html + linkHTML;
    console.info('add generated code to html, IV 6.2: ', html);
  }
}

generateAuthors('[data-authors~="' + author + '"]');



//---------------------------------------------- 6.2 --------------------------------------//
//------------------------------------------PIĄTA FUNKCJA----------------------------------//
//--- skopiowane z tagClickHandler -> DRUGA FUNKCJA ---//

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('make a new constant clickedElement, V 6.2: ', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('make a new constant href, V 6.2: ', href);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');            //zamieni '#author-'??? na pusty ciąg znaków
  console.log('make a new constant tag, V 6.2: ', tag);

  /* find all tag links with class active (Znajdowanie linków do tagów)*/
  const authorLink = document.querySelectorAll('a.active[href^="#author-"]');   //było "#tag-"
  console.log('find all tag links with class active, V 6.2: ', authorLink);

  /* START LOOP: for each active tag link */
  for(let authorLink of authorLinks){               //było: let articleTag of articleTags
    /* remove class active */
    authorLink.classList.remove('active');
    console.log('loop for each active tag link, V 6.2: ', authorLink);

          //z zad. 5.3: remove class 'active' from all article links
          //1. const activeLinks = document.querySelectorAll('.titles a.active');
          //2. for(let activeLink of activeLinks){
          //     activeLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log('find all tag links with href attribute, V 6.2:', tagHref);

  /* START LOOP: for each found tag link */
  for(let tagHref of tagHrefs){
    /* add class active */
    tagHref.classList.add('active');
    console.log('loop for each found tag link, V 6.2: ', tagHref);
  }
  /* END LOOP: for each found tag link */
}

generateTitleLinks('[data-author="' + tag + '"]');     //zmienić argument na odpowiedni



//---------------------------------------------- 6.2 ---------------------------------------//
//------------------------------------------SZÓSTA FUNKCJA----------------------------------//


function addClickListenersToAuthors(){
  /* find all links to authors */
  const links = document.querySelectorAll('a[href="' + href + '"]');
  console.log('find all links to authors, VI 6.2: ', links);

  /* START LOOP: for each link */
  for(let link of links){
    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);         //było tagClickHandler
    console.log('loop for each link, VI 6.2: ', link);
  }
  /* END LOOP: for each link */
}

addClickListenersToAuthors();