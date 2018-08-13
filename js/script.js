/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate

const $allStudents = $('.student-item');
const $pagination = $("<div class = pagination></div>");
const $searchBar = $("<div class = searchBar> <input type='text' id ='searchInput' placeholder = 'Student search...'  </div>");
const $allStudentDetails = $(".student-details");
const $allStudentNames = $(".student-details h3");
const $studentList = $('.student-list');

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four

function showSelectedTenItems(index, itemArray){
  for (var i = 0; i < itemArray.length; i++) {
    if(i >=  parseInt(index - 1) * 10 && i < (parseInt(index)) * 10){
      itemArray[i].style.display = 'block';
    } else {
      itemArray[i].style.display = 'none';
    }
  }
}

// Create and append the pagination links - Creating a function that can do this is a good approach

function createPagniationLinks(itemArray){
  $pagination.addClass('paginationLinks');
  const $paginationLinks = $("<ul class = 'paginationLinks'></ul>");
  let numberOfLinks = 1;
  for (var i = 0; i < itemArray.length; i+=10) {
    let $paginationLink = $(`<li>
                            <a href = '#' class = 'filter'> ${numberOfLinks} </a>
                            </li>`);
    $paginationLinks.append($paginationLink);
    numberOfLinks++;
  }
  $pagination.append($paginationLinks);
  $('body').append($pagination);
}

createPagniationLinks($allStudents);


// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here


$('.filter').on('click', function(){
  console.log($(this).text());
  showSelectedTenItems($(this).text(), $allStudents);
});

//Adding the search bar at the top of the page

function prependAndStyleSearchbar(){
  $('body').prepend($searchBar);
  $('#searchInput').css({
    margin: 4% 40% 0,
    fontSize: 30,
    fontWeight: 'bold',
    color : '#555',
    border: 'none'
  })
}

prependAndStyleSearchbar();

//Function that will only show students which are contained in the filteredArray
function showFilteredArrayElements(wholeArray, filteredArray){
  for (var i = 0; i < wholeArray.length; i++) {
    if(filteredArray.includes(wholeArray[i])){
      wholeArray[i].style.display = 'block';
    } else {
      wholeArray[i].style.display = 'none';
    }
  }
}

//Adding functionality to the search input field

$('#searchInput').on('input', function(){
  //Create a new array who fit the search criteria
  const $filteredArray = [];
  const $inputValue = $('#searchInput').val();

  $allStudentNames.each( (index, element) => {
    $name = $(element).text();
    if($name.includes($inputValue)){
      $filteredArray.push($(element).parent().parent())
    }
  })
  //Erase the old pagination numberOfLinks
  $pagination.html('');
  // Set the html of the pagination to the filtered students
  showFilteredArrayElements($allStudents, $filteredArray)
  //Display the first 10 students of the search
  showSelectedTenItems(0, $filteredArray);
  //Based on that new array generate the adequate pagination links
  createPagniationLinks($filteredArray);
});
