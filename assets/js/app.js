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
}


// display the category

const displayCategory = category => {
    console.log(category);
    
    const cardsContainer = document.getElementById('cards-container');
    // clear old card
    cardsContainer.innerHTML = ``

    category.forEach(news => {
        console.log(news);
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
            <h4 class="card-title">${news.title}</h4>
            <p class="card-text">
                ${news.details}
            </p>
        
            <div class="d-flex flex-wrap justify-content-between list-unstyled align-items-center mt-3">
              <div class="d-flex align-items-center pe-2">
                <img src="${news.author.img}" style="width: 60px; height: 60px; margin-right: 18px" class="rounded-circle img-fluid">
                <div class="d-flex align-items-center flex-column">
                    <h5>${news.author.name}</h5>
                    <h6>${news.author.published_date}</h6>
                </div>
              </div>
              <div class="px-2">
                <h6 class="fw-bold my-auto">
                  <i class="fa fa-eye"></i> ${news.total_view} 
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
              <button onclick="modalDetails('11468ed61aee84de492a8b04158a22f0')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show Details</button>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        `
        cardsContainer.appendChild(CardCol)

    })

}





{/* <div class="col card p-0 mb-4">
                  

</div> */}