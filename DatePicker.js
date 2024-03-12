class DatePicker {
    constructor(id, callback) {
      this.id = id;
      this.callback = callback;
    }
  
    render(selectedDate) {
      const today = new Date();
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();
  
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
  
      const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
      const calendarTable = document.createElement("table");
      calendarTable.classList.add("calendar");
  
      // Generate table header with days of the week
      const headerRow = calendarTable.insertRow();
      for (const dayOfWeek of daysOfWeek) {
        const headerCell = document.createElement("th");
        headerCell.textContent = dayOfWeek;
        headerRow.appendChild(headerCell);
      }
  
      // Calculate the first day of the month
      const firstDay = new Date(selectedYear, selectedMonth, 1);
      const startingDayOfWeek = firstDay.getDay();
  
      // Calculate the number of days in the month
      const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
      const numDays = lastDay.getDate();
  
      // Generate the calendar cells
      let currentDate = 1;
      for (let row = 0; currentDate <= numDays; row++) {
        const weekRow = calendarTable.insertRow();
  
        for (let col = 0; col < 7; col++) {
          const calendarCell = weekRow.insertCell();
  
          if (row === 0 && col < startingDayOfWeek) {
            // Display days from the previous month
            const previousMonth = new Date(selectedYear, selectedMonth, 0);
            const prevMonthDate = previousMonth.getDate() - startingDayOfWeek + col + 1;
            calendarCell.classList.add("other-month");
            calendarCell.textContent = prevMonthDate;
          } else if (currentDate > numDays) {
            // Display days from the next month
            const nextMonthDate = currentDate - numDays;
            calendarCell.classList.add("other-month");
            calendarCell.textContent = nextMonthDate;
            currentDate++;
          } else {
            // Display days from the current month
            calendarCell.textContent = currentDate;
            calendarCell.addEventListener("click", () => {
              this.callback(this.id, { month: selectedMonth + 1, day: currentDate, year: selectedYear });
            });
            currentDate++;
  
            if (selectedYear === today.getFullYear() && selectedMonth === today.getMonth() && currentDate - 1 === today.getDate()) {
              calendarCell.classList.add("today");
            }
          }
        }
      }
  
      // Create the date picker container
      const datePickerContainer = document.getElementById(this.id);
      datePickerContainer.innerHTML = "";
      datePickerContainer.appendChild(calendarTable);
  
      // Create the month and year header
      const header = document.createElement("div");
      header.classList.add("header");
      header.innerHTML = `
        <button class="prev-btn">&lt;</button>
        <span class="month-year">${monthNames[selectedMonth]} ${selectedYear}</span>
        <button class="next-btn">&gt;</button>
      `;
      datePickerContainer.prepend(header);
  
      // Attach event listeners to the previous and next buttons
      const prevBtn = header.querySelector(".prev-btn");
      prevBtn.addEventListener("click", () => {
        selectedDate.setMonth(selectedMonth - 1);
        this.render(selectedDate);
      });
  
      const nextBtn = header.querySelector(".next-btn");
      nextBtn.addEventListener("click", () => {
        selectedDate.setMonth(selectedMonth + 1);
        this.render(selectedDate);
      });
    }
  }