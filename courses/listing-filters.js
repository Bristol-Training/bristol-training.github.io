"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let sections = document.querySelectorAll("ul.course-listing");
    let courses = document.querySelectorAll("ul.course-listing > li");

    // Pre-compute a set of all categories that appear in the course listings,
    // but specify a desired order for them
    let category_order = ["Beginner", "Intermediate", "Advanced", "Data analysis", "Machine learning", "HPC", "University only"];
    let used_categories = new Set([...document.querySelectorAll("ul.course-listing ul.categories > li")].map(element => element.innerHTML));
    let categories = new Set([...category_order, ...used_categories].filter(category => used_categories.has(category)));

    /**
     * Filter the courses by the category and free-text filters and update the UI
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

        // The search results summary should be shown if there are any filters applied
        let results_shown = document.querySelectorAll("ul.course-listing > li:not([hidden])").length;
        document.querySelector("#courses-shown").innerText = results_shown;
        document.querySelector("#course-results-summary").hidden = !(selected_category || filter_text);
        document.querySelector("#course-zero-results").hidden = results_shown;

        // Scroll to the top of the course directory, but because it is sticky we scroll
        // to the end of the previous element
        let previous_element = document.querySelector("#course-filters").previousElementSibling
        document.documentElement.scrollTo({ top: previous_element.offsetTop + previous_element.offsetHeight + parseFloat(window.getComputedStyle(previous_element).marginBottom), behavior: "smooth" });
    }

    // Add category and free-text filters below the course directory TOC
    let filters = document.querySelector("#course-filters");
    filters.innerHTML = `
        <label for="text-filter">Search for course: <input type="text" id="text-filter" class="form-control" placeholder="Enter search text" size="30" autocomplete="off"></label>
        <label for="category-filter">Filter by category: <select id="category-filter" class="form-select">
            <option value="">All</option>
            ${Array.from(categories).map(category => `<option value="${category}">${category}</option>`).join("")}
        </select></label>
        <div id="course-results-summary" hidden>
            Currently showing <span id="courses-shown"></span> out of ${courses.length} total courses. <button id="reset-filters" class="btn btn-light">Reset filters</button>
        </div>
        <div id="course-zero-results" hidden>No courses matched your search.</div>
    `;
    document.querySelector("#text-filter").addEventListener("input", filter_courses);
    document.querySelector("#category-filter").addEventListener("change", filter_courses);
    document.querySelector("#reset-filters").addEventListener("click", () => {
        document.querySelector("#text-filter").value = "";
        document.querySelector("#category-filter").value = "";
        filter_courses();
    });
});