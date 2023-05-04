import classNames from "classnames";
//import "./styles.css";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import Button from "../shared/Button";
import { logout } from "../auth/service";
import Layout from "../layout/Layout";

const styleInLine = {
  backgroundColor: "lightblue",
};

const AdvertsPage = ({ onLogout }) => {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getLatestAdverts().then((adverts) => setAdverts(adverts));
  }, []);

  const theme = "dark";
  const className = classNames("advertsPage", {
    light: theme === "light",
    dark: theme === "dark",
  });

  const handleClick = async () => {
    await logout();
    onLogout();
  };

  return (
    <Layout title="What's going on...">
      <div
        //className={className}
        className={styles.AdvertsPage}
        //style={{
        //backgroundColor: theme === 'light'? 'lightblue' : 'darkblue',
        //}}
      >
        {!!adverts.length ? (
          <ul>
            {adverts.map((advert) => (
              <li key={advert.id}>{advert.content}</li>
            ))}
          </ul>
        ) : (
          <Button variant="primary">Be the first one...</Button>
        )}
      </div>
    </Layout>
  );
};

export default AdvertsPage;
