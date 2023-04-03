var quiz = {
    data: [
      {
        q: "What does the abbreviation HTML stand for?",
        o: ["HighText Markup Language", "HyperText Markup Language", "HyperText Markdown Language", "None of the above"],
        a: 1, 
      },
      {
        q: "How many sizes of headers are available in HTML by default?",
        o: ["5", "7", "3", "6"],
        a: 3,
      },
      {
        q: "Which CSS property determines how much the text should be emblazoned?",
        o: ["Font-Weight", "Font-Size", "Font-Family", "Font-Style"],
        a: 0,
      },
      {
        q: "Which CSS property allows you to set multiple list properties at once?",
        o: ["List - Style - Type", "List - Style", "List - Style- Position", "List - Style- Image"],
        a: 1,
      },
      {
        q: "Javascript is an _______ language??",
        o: ["Object-Oriented", "Object-Based", "Procedural", "Markup"],
        a: 0,
      },
    ],
  
    hWrap: null,
    hQn: null, 
    hAns: null,
  
    now: 0, 
    score: 0, 

    init: () => {
      quiz.hWrap = document.getElementById("quizWrap");
  
      quiz.hQn = document.createElement("div");
      quiz.hQn.id = "quizQn";
      quiz.hWrap.appendChild(quiz.hQn);
  
      quiz.hAns = document.createElement("div");
      quiz.hAns.id = "quizAns";
      quiz.hWrap.appendChild(quiz.hAns);
  
      quiz.draw();
    },
  
    draw: () => {
      quiz.hQn.innerHTML = quiz.data[quiz.now].q;
  
      quiz.hAns.innerHTML = "";
      for (let i in quiz.data[quiz.now].o) {
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.id = "quizo" + i;
        quiz.hAns.appendChild(radio);
        let label = document.createElement("label");
        label.innerHTML = quiz.data[quiz.now].o[i];
        label.setAttribute("for", "quizo" + i);
        label.dataset.idx = i;
        label.addEventListener("click", () => {
          quiz.select(label);
        });
        quiz.hAns.appendChild(label);
      }
    },
  
    select: (option) => {
      let all = quiz.hAns.getElementsByTagName("label");
      for (let label of all) {
        label.removeEventListener("click", quiz.select);
      }
  
      let correct = option.dataset.idx == quiz.data[quiz.now].a;
      if (correct) {
        quiz.score++;
        option.classList.add("correct");
      } else {
        option.classList.add("wrong");
      }
  
      quiz.now++;
      setTimeout(() => {
        if (quiz.now < quiz.data.length) {
          quiz.draw();
        } else {
          quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
          quiz.hAns.innerHTML = "";
        }
      }, 1000);
    },
  
    reset: () => {
      quiz.now = 0;
      quiz.score = 0;
      quiz.draw();
    },
  };
  window.addEventListener("load", quiz.init);