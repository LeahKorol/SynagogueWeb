export const fetchNews = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          hasUpdates: true,
          news: [
            { title: "כותרת חדשה 1" },
            { title: "כותרת חדשה 2" },
            { title: "כותרת חדשה 3" }
          ]
        });
      }, 1000); 
    });
  };