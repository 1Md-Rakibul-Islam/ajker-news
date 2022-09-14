// feach data categories
const loadCategories = () => {
    const url =`https://openapi.programming-hero.com/api/news/categories`

    fetch(url)
    .then(res => res.json())
    .then(data => newsTitle(data.data.news_category))

}

loadCategories()


// set news title and show the display
const newsTitle = newses => {
    const newsUl = document.getElementById('news-menu-single')
    newses.forEach(news => {
        const createLI = document.createElement('li');

        createLI.classList.add('menu-bar');
        createLI.innerHTML = `
            <a onclick="loadCategory('${news.category_id}')">${news.category_name}</a>
        `
        newsUl.appendChild(createLI)

    })
}

// load dynamic category
const loadCategory = categoryID => {
    // console.log(categoryID);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryID}`

    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data))

    toggleSpinner(true)
}


// display the category

const displayCategory = category => { 
  const itemsNum = document.getElementById("items-Found");
  const num = category.length;
  itemsNum.innerText = `${num <= 0 ? "0 item found" : num + " items found"}`;
  //sorted most viewes
  category.sort((a, b) => b.total_view - a.total_view);

    const cardsContainer = document.getElementById('cards-container');
    // clear old card
    cardsContainer.innerHTML = ``

    category.forEach(news => {
      // var newsLength = news.length
        // create card col
        const CardCol = document.createElement('div');
        CardCol.classList.add('col', 'card', 'p-0', 'mb-4');
        CardCol.innerHTML = `
        <div class="row g-0">
        <div class="col-md-3 col-12">
          <img src="${news.thumbnail_url}" class="w-100 h-100 p-3 rounded-start" alt="...">
        </div>
        <div class="col-md-9 col-12">
          <div class="row align-content-center card-body h-100">
            <h4 class="card-title">${news.title ? news.title : 'Not Found'}</h4>
            <p class="card-text">
                ${news.details ? news.details : 'Not Found'}
            </p>
        
            <div class="d-flex flex-wrap justify-content-between list-unstyled align-items-center mt-3">
              <div class="d-flex align-items-center pe-2">
                <img src="${news.author.img}" style="width: 60px; height: 60px; margin-right: 18px" class="rounded-circle img-fluid">
                <div class="d-flex flex-column">
                    <h5>${news.author.name ? news.author.name : 'Not Found'}</h5>
                </div>
              </div>
              <div class="px-2">
                <h6 class="fw-bold my-auto">
                  <i class="fa fa-eye"></i> ${news.total_view ? news.total_view : 0} 
                </h6>
              </div>
              <div class="px-2">
                <ul class="list-unstyled d-flex my-auto">
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star-half-stroke"></i></li>
                  <li><i class="fa fa-star-half"></i></li>
                </ul>
              </div>
              <div class="px-1">
              <button class="btn btn-primary fa fa-arrow-right" onclick="loadModalDetails('${news._id}')" href="#" data-bs-toggle="modal" data-bs-target="#newsDetailModal"></button>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        `
        cardsContainer.appendChild(CardCol)

    })

    toggleSpinner(false)

}

// modal fatch.
const loadModalDetails = async newsID => {
    const url = `https://openapi.programming-hero.com/api/news/${newsID}`

    const res = await fetch(url);
    const data = await res.json();

    displayModalDetails(data.data[0]);

}

// modal window function

const displayModalDetails = userID => {
    // console.log(userID);

    const modalContainer = document.getElementById('modal-contents');
    modalContainer.innerHTML = `
        <div id="news-details-img" class="modal-header">
            <h3>${userID.author.name}</h3>
        </div>
        <span class="my-3 ms-3" >Published: 
            <h6 class="d-inline">${userID.author.published_date ? userID.author.published_date : 'No data found'}</h6>
        </span>
            <img class="img-fluid w-100 h-50 p-3 pt-5" src="${userID.thumbnail_url}"></img>
            <h5 class="px-3">${userID.title}</h5>
            <hr>
        <div id="news-details" class="modal-body">
            <p>${userID.details}</p>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `

}

// spinner start
const toggleSpinner = isLoding => {
  const loaderSection = document.getElementById('loader-spinner');

  if (isLoding) {
    loaderSection.classList.remove('d-none');
  }

  else {
    loaderSection.classList.add('d-none')
  }
}