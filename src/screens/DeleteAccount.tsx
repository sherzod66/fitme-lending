import React, { useState } from "react";

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userName: "",
    cause: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const URL = "https://fitme.uz/api/feedback/send";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const examination = (): boolean => {
    return (
      formData.fullName.length > 0 &&
      formData.email.length > 4 &&
      formData.userName.length > 3
    );
  };

  const requestToServer = async (): Promise<void> => {
    const getLocal = localStorage.getItem("send");
    const dayPassed = getLocal ? Date.now() - +getLocal : 0;

    if (!getLocal || dayPassed > 86400000) {
      try {
        const req = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const res = await req.json();
        setIsLoading(false);

        if (res.success) {
          const localData = Date.now();
          localStorage.setItem("send", `${localData}`);
          alert("Успешно отправлено!");
          setFormData({
            fullName: "",
            email: "",
            userName: "",
            cause: "",
          });
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        alert("Ошибка: что-то пошло не так!");
      }
    } else {
      alert("Ваша заявка на удаление аккаунта уже была отправлена!");
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (examination()) {
      setIsLoading(true);
      requestToServer();
    } else {
      alert("Заполните все поля");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-black to-[#2a0845] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <form
          id="msform"
          onSubmit={handleSubmit}
          className="bg-[#222222] rounded-none shadow-lg p-6 md:p-8 border-0 relative"
        >
          <h2 className="fs-title text-white text-lg uppercase font-bold mb-6 tracking-wider text-center">
            Для запроса удаления аккаунта и связанных с ним данных, пожалуйста,
            обратитесь к службе поддержки. Ваш запрос будет обработан в
            кратчайшие сроки. Пожалуйста, укажите следующую информацию:
          </h2>

          <div className="mb-5">
            <label
              htmlFor="full-name"
              className="form__label block text-white text-left text-base mb-2"
            >
              Имя и фамилию, указанные при регистрации аккаунта.
            </label>
            <input
              id="full-name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Джон Смит"
              className="w-full p-4 bg-transparent border-2 border-gray-300 rounded-none text-white text-sm mb-3 focus:border-red-600 focus:outline-none focus:ring-0 transition-all duration-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="full-email"
              className="form__label block text-white text-left text-base mb-2"
            >
              Адрес электронной почты, связанный с аккаунтом.
            </label>
            <input
              id="full-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              className="w-full p-4 bg-transparent border-2 border-gray-300 rounded-none text-white text-sm mb-3 focus:border-red-600 focus:outline-none focus:ring-0 transition-all duration-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="full-user"
              className="form__label block text-white text-left text-base mb-2"
            >
              Логин или идентификатор аккаунта, который вы хотите удалить.
            </label>
            <input
              id="full-user"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="user name"
              className="w-full p-4 bg-transparent border-2 border-gray-300 rounded-none text-white text-sm mb-3 focus:border-red-600 focus:outline-none focus:ring-0 transition-all duration-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="full-info"
              className="form__label block text-white text-left text-base mb-2"
            >
              Причину удаления аккаунта
            </label>
            <textarea
              name="cause"
              id="full-info"
              value={formData.cause}
              onChange={handleInputChange}
              className="w-full p-4 bg-transparent border-2 border-gray-300 rounded-none text-white text-sm mb-3 h-32 focus:border-red-600 focus:outline-none focus:ring-0 transition-all duration-500"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`action-button bg-red-600 text-white font-bold rounded-full py-3 px-5 mx-2 border-0 cursor-pointer ${
                isLoading ? "hidden" : ""
              }`}
            >
              Отправить
            </button>

            <div
              className={`loader__wrapper mx-auto w-8 h-8 ${
                isLoading ? "" : "hidden"
              }`}
            >
              <span className="loader block w-8 h-8 rounded-full border-5 border-white"></span>
            </div>
          </div>
        </form>
      </div>

      <style>
        {`
          .loader {
            width: 32px;
            height: 32px;
            display: block;
            border-radius: 50%;
            position: relative;
            animation: rotate 1s linear infinite;
            border: 5px solid #fff;
            box-sizing: border-box;
          }
          .loader::before {
            content: "";
            box-sizing: border-box;
            position: absolute;
            inset: 0px;
            border-radius: 50%;
            border: 5px solid #fff;
            animation: prixClipFix 2s linear infinite;
          }

          @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes prixClipFix {
            0% {
              clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
            }
            25% {
              clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
            }
            50% {
              clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
            }
            75% {
              clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
            }
            100% {
              clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
            }
          }

          .action-button:hover, .action-button:focus {
            box-shadow: 0 0 0 2px white, 0 0 0 3px #ee0979;
          }
        `}
      </style>
    </div>
  );
};

export default FeedbackForm;
