const loadFeature = (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(url).then(response => response.json())
    .then(data => displayFeature(data.data.tools, dataLimit))
}
const displayFeature = (data, dataLimit) => {
    toggleLoader(true);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    // display 6 card
    const showMore = document.getElementById('show-more');

    if (dataLimit && data.length > 6){
        showMore.classList.remove('d-none');
        data = data.slice(0,6);
    }
    else{
        showMore.classList.add('d-none');
    }
        // display all card
    data.forEach(singleData => {
        console.log(singleData);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card h-100 pt-3 px-3">
            <img src="${singleData.image}" class="card-img-top rounded-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <p class="card-text p-0 m-0">1.${singleData.features[0]}</p>
                <p class="card-text p-0 m-0">2.${singleData.features[1]}</p>
                <p class="card-text p-0 m-0">3.${singleData.features[2]}</p>
            </div>
            <hr>
            <div class="footer pb-3 px-3 d-flex justify-content-between align-items-center">
                <div>
                    <p class="p-0 m-0">${singleData.name}</p>
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-calendar-days"></i>
                        <p class="p-0 m-0">${singleData.published_in}</p>
                    </div>
                </div>
                    <i class="fa-solid fa-circle-arrow-right bg-red" data-bs-toggle="modal" data-bs-target="#card-Modal" onclick="modalFetch('${singleData.id}')"></i>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
        toggleLoader(false);
            
    })
}
     
    const modalFetch = (id) => {
        const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
        fetch(url)
        .then(response => response.json())
        .then(data => modalDetails(data.data))
    }
    const modalDetails = (data) => {
        console.log(data)
    const modal = document.getElementById('modal');
    modal.innerHTML = "";
    const modalDiv = document.createElement('div');
    modal.classList.add('modal-content');
    modalDiv.innerHTML = `
        
    <div class="modal-header ">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
        <div class="modal-body rounded d-flex flex-column justify-content-center border border-warning p-2 p-md-4">
        <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col bg-danger bg-gradient bg-opacity-75 rounded-3">
        <div class="">
            <div class="card-body">
                <h5 class="card-title">${data.description ? data.description : 'Did not found any discription'}</h5>
                <p class="card-text"></p>
                <div class="row d-flex justify-content-between mb-3 gap-3 ">
                    <div class="col bg-light rounded-3 d-flex align-items-center justify-content-center">
                        <p class="text-center text-success">${data.pricing ? data.pricing[0].price + ' <br>' + data.pricing[0].plan : 'Free of Cost/Basic'}</p>
                    </div>
                    <div class="col bg-light rounded-3 d-flex align-items-center justify-content-center">
                        <p class="text-center text-primary">${data.pricing ? data.pricing[1].price + ' <br>' + data.pricing[1].plan : 'Free Of Cost/Pro'}</p>
                    </div>
                    <div class="col bg-light rounded-3 d-flex align-items-center justify-content-center">
                        <p class="text-center text-info">${data.pricing ? data.pricing[2].price + ' <br>' + data.pricing[2].plan : 'Free of Cost /Enterprise'}</p>
                    </div>
                </div>
        
        <div class="row d-flex justify-content-between gap-3">
            <div class="col ">
                <h3>Features</h3>
                <p class="m-0 p-0">${data.features ? data.features[1].feature_name : 'No features found' }</p>
                <p class="m-0 p-0">${data.features ? data.features[2].feature_name : 'No features found' }</p>
                <p class="m-0 p-0">${data.features ? data.features[3].feature_name : 'No features found' }</p>
            </div>
            <div class="col">
                <h3>Integrations</h3>
                <p class="m-0 p-0">${data.integrations ? data.integrations[0] : 'No data Found'}</p>
                <p class="m-0 p-0">${data.integrations ? data.integrations[1] : 'No data Found'}</p>
                <p class="m-0 p-0">${data.integrations ? data.integrations[2] : 'No data Found'}</p>
            </div>
        </div>
    </div>
  </div>
</div>
<div class="col rounded-3">
  <div class="card position-relative">
    <img src="${data.image_link ? data.image_link[0] : "Can't find any image" }" class="card-img-top" alt="...">
    <button id="score" class="btn btn-danger position-absolute top-0 end-0 " weight="100px">${data.accuracy.score}%accuracy</button>
    <p ></p>
    <div class="card-body text-center">
      <h5 class="card-title">${data.input_output_examples ? data.input_output_examples[0].input : 'No data Found'}</h5>
      <p class="card-text">${data.input_output_examples ? data.input_output_examples[1].output : 'No data Found'}</p>
    </div>
  </div>
</div>

</div>
</div>
    `;
    modal.appendChild(modalDiv);
    // show accuracy button
    const score = document.getElementById('score');
    if(data.accuracy.score === null){
        score.classList.add('d-none');
    }
    else{
        score.classList.remove('d-none');

    };
};

// click handler for show more
document.getElementById('show-more').addEventListener('click', function (){

    loadFeature();
})
    // spinner
const loader = document.getElementById('loader');
const toggleLoader = (isLoading) => {
    if(isLoading) {
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
};
