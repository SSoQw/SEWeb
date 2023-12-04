import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  
  return (
    <div className="not-found-page">
      <img src="./error404.svg" alt="404 Error" />
      <h1>The Lights Aren&apos;t on Here Yet!</h1>
      <button onClick={goBack} className="button404">Go Back Home</button>
    </div>
  );
};

export default NotFoundPage;