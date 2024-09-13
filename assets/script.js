"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let sections = document.querySelectorAll("ul.course-listing");
    let courses = document.querySelectorAll("ul.course-listing > li");

    // We can pre-compute a set of all categories that appear in the course listings
    let categories = new Set([...document.querySelectorAll("ul.course-listing ul.categories > li")].map(element => element.innerHTML));

    /**
     * Filter the courses by the category and free-text filters, then filter out whole sections
     * if they contain no visible courses
     */
    function filter_courses() {
        let selected_category = document.querySelector("#category-filter").value;
        let filter_text = document.querySelector("#text-filter").value.toLowerCase();

        for (let course of courses) {
            let show_course = true;
            if (selected_category) {
                let course_categories = new Set([...course.querySelectorAll("ul.categories > li")].map(element => element.innerHTML));
                show_course = show_course && course_categories.has(selected_category);
            }
            if (filter_text) {
                // Match every word separately
                let course_text = course.innerText.toLowerCase();
                show_course = show_course && filter_text.split(" ").every(word => course_text.includes(word));
            }
            course.hidden = !show_course;
        }

        for (let section of sections) {
            let no_results = section.querySelectorAll("& > li:not([hidden])").length === 0;
            section.closest("section").classList.toggle("no-results", no_results);
        }
    }

    // Add category and free-text filters below the course directory TOC
    let filters = document.querySelector("#course-filters");
    filters.innerHTML = `
        <label for="text-filter">Search for course: <input type="text" id="text-filter" class="form-control" placeholder="Enter search text" size="30"></label>
        <label for="category-filter">Filter by category: <select id="category-filter" class="form-select">
            <option value="">All</option>
            ${Array.from(categories).map(category => `<option value="${category}">${category}</option>`).join("")}
        </select></label>
        <button id="reset-filters" class="btn btn-light">Reset filters</button>
    `;
    document.querySelector("#text-filter").addEventListener("input", filter_courses);
    document.querySelector("#category-filter").addEventListener("change", filter_courses);
    document.querySelector("#reset-filters").addEventListener("click", () => {
        document.querySelector("#text-filter").value = "";
        document.querySelector("#category-filter").value = "";
        filter_courses();
    });
});