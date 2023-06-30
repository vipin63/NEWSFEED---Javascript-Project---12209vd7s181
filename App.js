function goToNewNews() {
  window.location.href = 'newnews.html';
}
function goToSavedNews() {
  window.location.href = 'savednews.html';
}
function goHomePage(){
  window.location.href = 'index.html';

}

const newNewsDocs = document.getElementById("newNews");
const savedNews = document.getElementById("savedNews");
const allNews = [];
let likedNews = localStorage.getItem("savedNewsItems")!== null ? [...JSON.parse(localStorage.getItem("savedNewsItems"))]:[];

const url =
    "https://content.newtonschool.co/v1/pr/64806cf8b7d605c99eecde47/news";
function fetchNews(url, filterKey="") {
    fetch(url).then((data) => {
        data.json().then((res) => {
            let innerHtml = "";
            allNews.push(...res);
            if(filterKey===""){
              res.forEach((element, index) => {
                  const newsCard = ` <div class="news__card">
                  <div class="news__card--header">
                     <div>By: ${element[" author"]}</div>
                     <div>category: ${element[" category"]}</div>
                   </div>
                   <div class="news__card--body">
                     ${element["content"]}
                     <a
                       class="news__card--link"
                       href="${element.url}"
                       target="_blank"
                       >Read More.</a
                     >
                   </div>
                   <div class="like--icon--container" type="button" onclick="addToLike(${index});">
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       width="24"
                       height="24"
                       viewBox="0 0 24 24"
                       class="like--btn + ${likedNews.find((item)=> item.url === element.url) && 'like--btn like--btn--active'}"
                     >
                       <path
                         d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
                       />
                     </svg>
                  </div>
                 </div>`;
                  innerHtml += newsCard;
              });
            }else{
              res.filter((item)=>item[" category"].toLowerCase()===filterKey).forEach((element, index) => {
                const newsCard = ` <div class="news__card">
                  <div class="news__card--header">
                     <div>By: ${element[" author"]}</div>
                     <div>category: ${element[" category"]}</div>
                   </div>
                   <div class="news__card--body">
                     ${element["content"]}
                     <a
                       class="news__card--link"
                       href="${element.url}"
                       target="_blank"
                       >Read More.</a
                     >
                   </div>
                   <div class="like--icon--container" type="button" onclick="addToLike(${index});">
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       width="24"
                       height="24"
                       viewBox="0 0 24 24"
                       class="like--btn + ${likedNews.find((item) => item.url === element.url) && 'like--btn like--btn--active'}"
                     >
                       <path
                         d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
                       />
                     </svg>
                  </div>
                 </div>`;
                innerHtml += newsCard;
              });
            }
            newNewsDocs.innerHTML = innerHtml;
          });
         });
}

function addToLike(index) {
  // var value = JSON.parse(event.target.getAttribute('value'));
  // Use the 'value' variable as needed
  if(likedNews.find((item)=>item.url === allNews[index].url)=== undefined){
    likedNews.push(allNews[index]);
    localStorage.setItem("savedNewsItems", JSON.stringify(likedNews));
  }else{
    localStorage.setItem("savedNewsItems", JSON.stringify(likedNews.filter((news) => news.url !== allNews[index].url)));
  }
  window.location.reload();

}

function removeLiked (index){
  const tempLikedNews = [];
  likedNews.forEach((item,i)=>{
    if(i !== index){
      tempLikedNews.push(item);
    }
  })
  localStorage.setItem("savedNewsItems", JSON.stringify(tempLikedNews));
  window.location.reload();
}

function fetchSavedNews (filterKey=""){
  let innerHtml = "";
  if(filterKey === ""){
  JSON.parse(localStorage.getItem("savedNewsItems")).forEach((element, index) => {
    const newsCard = ` <div class="news__card">
      <div class="news__card--header">
        <div>By: ${element[" author"]}</div>
        <div>category: ${element[" category"]}</div>
      </div>
      <div class="news__card--body">
        ${element["content"]}
        <a
          class="news__card--link"
          href="${element.url}"
          target="_blank"
          >Read More.</a
        >
      </div>
      <div class="like--icon--container" type="button" onclick="removeLiked(${index});">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="like--btn like--btn--active"
        >
          <path
            d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
          />
        </svg>
      </div>
    </div>`;
    innerHtml += newsCard;
  });
}else{
    JSON.parse(localStorage.getItem("savedNewsItems")).filter((item) => item[" category"].toLowerCase() === filterKey).forEach((element, index) => {
      const newsCard = ` <div class="news__card">
      <div class="news__card--header">
        <div>By: ${element[" author"]}</div>
        <div>category: ${element[" category"]}</div>
      </div>
      <div class="news__card--body">
        ${element["content"]}
        <a
          class="news__card--link"
          href="${element.url}"
          target="_blank"
          >Read More.</a
        >
      </div>
      <div class="like--icon--container" type="button" onclick="removeLiked(${index});">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="like--btn like--btn--active"
        >
          <path
            d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
          />
        </svg>
      </div>
    </div>`;
      innerHtml += newsCard;
    });
}
  savedNews.innerHTML = innerHtml;
}
 


if (window.location.href.includes("newnews.html")){
  fetchNews(url);
}

if (window.location.href.includes("savednews.html")) {
  fetchSavedNews();
}

function applyFilter(key){
  if (window.location.href.includes("newnews.html")) {
    if (key === "all") {
      fetchNews(url, "");
    } else {
      fetchNews(url, key);
    }
  }
  if (window.location.href.includes("savedNews.html")) {
    
    if (key === "all") {
      fetchSavedNews( "");
    } else {
      fetchSavedNews( key);
    }
  } 

  
}
