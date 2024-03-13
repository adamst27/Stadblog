import "@styles/globals.css";
import Provider from "@components/Provider";
import Nav from "@components/Nav";
export const metadata = {
  title: "stadblog",
  description: "Share ideas between devs",
};
const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Rootlayout;
