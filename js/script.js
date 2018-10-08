/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate

//JQuery
// const $allStudents = $('.student-item');
// const $pagination = $(`<div class = pagination>
//                          <ul class = paginationLinks> </ul>
//                         </div`);
// const $searchBar = $("<div class = searchBar> <input type='text' id ='searchInput' placeholder = 'Student search...'>  </div>");
// const $allStudentDetails = $(".student-details");
// const $allStudentNames = $(".student-details h3");
// const $studentList = $('.student-list');
// const $filteredStudentList = $('.student-item');

//Vanilla JS
// Variables concerning students
const allStudentListItems = document.querySelectorAll('.student-item');
const allStudentDetails = document.querySelectorAll(".student-details");
const allStudentNames = document.querySelectorAll(".student-details h3");
const studentListUL = document.querySelector('.student-list');

//Variables concerning pagination
const pagination = document.createElement('div');
pagination.className = 'pagination-div';
const paginationLinksList = document.createElement('ul');
paginationLinksList.className = 'pagination-links-ul';
pagination.appendChild(paginationLinksList);
document.querySelector('.page').append(pagination);


//Variables concerning searchbar
const searchBarDiv = document.createElement('div');
searchBarDiv.className = 'searchbar-div';
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.id = 'searchInput';
searchBar.placeholder = 'Student search..';
searchBarDiv.append(searchBar);

//Appending a message heading to show the message if there are no search results

const messageHeading =  document.createElement('h3');
$('.page-header h2').prepend(messageHeading);

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four

function showSelectedTenItems(index, itemArray){

  //Based on the button which is clicked (1-6), while looping through, only items
  //whose ies are in the specified interval will be shown, others hidden
  for (var i = 0; i < itemArray.length; i++) {
    if(i >=  parseInt(index - 1) * 10 && i < (parseInt(index)) * 10){
      itemArray[i].style.display = 'block';
    } else {
      itemArray[i].style.display = 'none';
    }
  }
}

// Showing only the first 10 items of the student list initially
showSelectedTenItems(1, allStudentListItems);

// Create and append the pagination links - Creating a function that can do this is a good approach

function createPagniationLinks(itemArray){
  let numberOfLink = 1;
    //For 10 items we need one pagination button
  for (let i = 0; i < itemArray.length; i+=10) {
    //Creating the li and a elements needed for a single pagination button
    let paginationButton = document.createElement('li');
    let paginationLink = document.createElement('a');
    paginationLink.href = '#';
    paginationLink.className = 'pagination-link';
    paginationLink.text = numberOfLink;

    //Appending the link to the button, and the button to the ul
    paginationButton.appendChild(paginationLink);
    paginationLinksList.appendChild(paginationButton);
    numberOfLink++;
  }
  //Adding event listener to all links. This is done here, because when the
  //links are removed, so are their previous event handlers, and hence they must be added again
  addEventListenerToLinks();
}



// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here

//Function which adds the event listener to the newly created pagination links

function addEventListenerToLinks(){
  $('.pagination-link').on('click', function(){
    const currentSearch = returnFilteredArrayOfStudents();
    showSelectedTenItems($(this).text(), currentSearch);
  });
}

//Function which removes all pagination links currently on the page

function removePaginationLinks(){
  while(paginationLinksList.firstChild){
    paginationLinksList.removeChild(paginationLinksList.firstChild);
  }
}

// Creating initial pagination links based on the whole student list
createPagniationLinks(allStudentListItems);


//Adding the search bar at the top of the page

function prependAndStyleSearchbar(){
  $('body').prepend(searchBarDiv);
  $('#searchInput').css({
    marginTop: 32,
    marginLeft: 350,
    marginRight: 200,
    marginBottom:  0,
    fontSize: 30,
    fontWeight: 'bold',
    color : '#555',
    border: '2px solid grey'
  })
}

prependAndStyleSearchbar();

//Function that will only show students which are contained in the filteredArray
function showFilteredArrayElements(wholeArray, filteredArray){
  for (var i = 0; i < wholeArray.length; i++) {
    if(filteredArray.index(wholeArray[i]) > -1){
      wholeArray[i].style.display = 'block';
    } else {
      wholeArray[i].style.display = 'none';
    }
  }
}


function returnFilteredArrayOfStudents(){

  //Based on the value in the search, return all students whose names
  //match the search criteria in an array

    const $inputValue = $('#searchInput').val();
    const filteredStudents = [];

    for (var i = 0; i < allStudentNames.length; i++) {
      if(allStudentNames[i].textContent.includes($inputValue)){
        filteredStudents.push(allStudentNames[i].parentElement.parentElement);
      }
    }

    return filteredStudents;
}

//Capitalizing students name adequately
function capitalizeStudentsNames(){
  const studentNames = document.querySelectorAll('.student-details h3');
  for (let i = 0; i < studentNames.length; i++) {
    const studentName = studentNames[i].textContent;
    const capitalizedStudentName = studentName.split(' ').map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    }).join(' ')
    studentNames[i].textContent = capitalizedStudentName;  
  }
}

capitalizeStudentsNames();


//Adding functionality to the search input field
//Event listener for search input

$('#searchInput').on('input', function(){

  //Getting the search input value
  const $inputValue = $('#searchInput').val();

  //Loop through all students
  //Find the ones whose names matches the search criteria and show them
  //Hide the others

  for (var i = 0; i < allStudentNames.length; i++) {
    if(allStudentNames[i].textContent.includes($inputValue)){
      allStudentNames[i].parentElement.parentElement.style.display = 'block';
    } else {
      allStudentNames[i].parentElement.parentElement.style.display = 'none';;
    }
  }

  //Storing the filtered array of students into a variable
  const filteredStudents = returnFilteredArrayOfStudents();


  //If there are no results based on serach, display the adequate message in the message heading
  if(filteredStudents.length === 0){
    messageHeading.textContent = 'Sorry, but no results match your search';
  } else {
    messageHeading.textContent = '';
  }

  //Removing the pagination created by default or based on previous search
  removePaginationLinks();
  //Display the first 10 students of the search
  showSelectedTenItems(1, filteredStudents);
  //Based on that new array generate the adequate pagination links
  createPagniationLinks(filteredStudents);
});
