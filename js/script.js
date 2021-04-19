'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink:  Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloud-link').innerHTML)
};

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.authors.list';
const optCloudClassCountAuthors = 4;
const optCloudClassPrefixAuthors = 'author-size-';


// ------------------------------------------- 5.3 -------------------------------------------//

function titleClickHandler (event) {

  event.preventDefault();
  const clickedElement = this;

  /* add class 'active' to the clicked link */
  const activeLinks = document.querySelectorAll('.titles a.active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* find the correct article using the selector (value of 'href' attribute) */
  const articleVisible = clickedElement.getAttribute('href');

  const articles = document.querySelectorAll(articleVisible);

  /* add class 'active' to the correct article */
  clickedElement.classList.add('active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  for (let article of articles) {
    article.classList.add('active');
  }
}


// ----------------------------------------- 5.4 ---------------------------------------------//

function generateTitleLinks (customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);    // customSelector z zad. 6.2

  let html = '';

  clearList();

  function clearList() {
    titleList.innerHTML = '';
  }


  for (let article of articles) {                           //article jest iterowany w pętli
    /* get the article id */
    const articleID = article.getAttribute('id');

    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTMLData = {id: articleID, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList (html variable)*/
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();


//--------------------------------------DODAJEMY TAGI DO ARTYKUŁU--------------------------//
//---------------------------------------------- 6.2 --------------------------------------//
//------------------------------------------PIERWSZA FUNKCJA-------------------------------//

function calculateTagsParams (tags) {

  const params = {max: 0, min: 999999};


  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
}

//-----------------------------------------------------------------------------------------//

function calculateTagClass (count, params) {            //(s.17) Wybranie kalsy dla tagu

  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);      //(s.19)

  return optCloudClassPrefix + classNumber;
}

//-----------------------------------------------------------------------------------------//

function generateTags() {

  /* (z 6.3) create a new variable allTags with an empty object */
  let allTags = {};
  const allTagsData = {tags: []};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const tagsNames = article.getAttribute('data-tags');

    /* split tags into array */
    const tags = tagsNames.split(' ');

    /* START LOOP: for each tag */
    for (let tag of tags) {
      /* generate HTML of the link */
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML =  templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* (z 6.3) check if this link is not already in allTags */
      if (!allTags.hasOwnProperty (tag)) { 
        /* add tag to allTags object */ 
        allTags[tag] = 1;

      } else {
        allTags[tag]++;
      }
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }

  /* (z 6.3) Start LOOP: for each tag in allTags */
  for (let tag in allTags) {
    allTagsData.tags.push ({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }

  /* (z 6.3) add HTML from allTags to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();


//---------------------------------------------- 6.2 --------------------------------------//
//------------------------------------------DRUGA FUNKCJA----------------------------------//

function tagClickHandler (event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('make a new constant href (II 6.2): ', href);

  /* (ok) make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');          //zamieni '#tag-' na pusty ciąg znaków
  console.log('make a new constant tag (II 6.2): ', tag);

    /* find all tag links with class active (Znajdowanie linków do tagów)*/
  const tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');


  /* START LOOP: for each active tag link */
  for (let tagActive of tagsActive) {
    /* remove class active */
    tagActive.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsLink = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagsLink) {
    /* add class active */
    tagLink.classList.add('active');
  }

  /*execute function "generateTitleLinks" (z punktu 5.4) with article selector as argument */
  generateTitleLinks(`[data-tags~="${ tag }"]`);
}


//---------------------------------------------- 6.2 ----------------------------------------//
//------------------------------------------TRZECIA FUNKCJA----------------------------------//

function addClickListenersToTags() {
  /* find all links to tags */  
  const links = document.querySelectorAll('.post-tags a');
  const cloudTagLinks = document.querySelectorAll('.tags.list a');

  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    console.log('loop for ech link, III 6.2: ', link);
  }

  for (let cloudTagLink of cloudTagLinks) {
    cloudTagLink.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();


//---------------------------------------------- 6.2 ----------------------------------------//
//------------------------------------------CZWARTA FUNKCJA----------------------------------//

function generateAuthor() {

  let allAuthors = {};
  let allAuthorsData = {authors: []};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  const authorList = document.querySelector(optAuthorsListSelector);
  const authorsParams = calculateAuthorParams(allAuthors);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    const authorName = article.getAttribute('data-author');
    const linkHTMLData = {id: authorName, title: authorName};
    const linkHTML = templates.authorLink(linkHTMLData);
    let html = '';

    /* make html variable with empty string */
    html = html + linkHTML;

    if (!allAuthors.hasOwnProperty (authorName)) {
      allAuthors[authorName] = 1;

    } else {
      allAuthors[authorName]++;
    }

    authorWrapper.innerHTML = html;
  }

  for (let authorName in allAuthors) {
    allAuthorsData.authors.push ({
      author: authorName,
      count: allAuthors[authorName],
      className: calculateAuthorClass(allAuthors[authorName], authorsParams),
    });

  }

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthor();


//-----------------------------------calculateAuthorClass------------------------------//
//--------------------------------------------------------------------------------------//

function calculateAuthorClass (count, params) {

  const classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCountAuthors + 1);

  return optCloudClassPrefixAuthors + classNumber;
}


//-----------------------------------calculateAuthorParams------------------------------//
//--------------------------------------------------------------------------------------//

function calculateAuthorParams (authors) {

  const params = {max: 0, min: 999999};

  for (let author in authors) {
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
  }

  return params;
}


//---------------------------------------------- 6.2 --------------------------------------//
//------------------------------------------PIĄTA FUNKCJA----------------------------------//

function authorClickHandler (event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active (Znajdowanie linków do tagów)*/
  const authorsActive = document.querySelectorAll('a.active[href^="#author-"]');

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorsLink = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for (let authorActive of authorsActive) {
    /* remove class active */
    authorActive.classList.remove('active');
  }

  for (let authorLink of authorsLink) {
    /* add class active */
    authorLink.classList.add('active');
  }

  generateTitleLinks(`[data-author="${ author }"]`);
}


//---------------------------------------------- 6.2 ---------------------------------------//
//------------------------------------------SZÓSTA FUNKCJA----------------------------------//

function addClickListenersToAuthor() {            //było (document)
  /* find all links to authors */
  const links = document.querySelectorAll('.post-author a');
  //console.log('find all links to authors, VI 6.2: ', links);

  const cloudAuthorLinks = document.querySelectorAll('.authors.list a');

  /* START LOOP: for each link */
  for (let link of links) {
    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    //console.log('loop for each link: ', link);
  }

  for (let cloudAuthorLink of cloudAuthorLinks) {
    cloudAuthorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthor();




