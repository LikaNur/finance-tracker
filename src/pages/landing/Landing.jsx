import { Link } from 'react-router-dom';

import './LandingStyles.scss';


const Landing = () => {
  return (
    <div>
      <main>
        <section className="intro">
          <h1 className="intro__title">
          <span className="intro__title_span">Хумо Онлайн </span>
          Деньги под контролем
          </h1>
          <p className="intro__subtitle">
          Откройте для себя новое измерение управления финансами с нашим последним обновлением! 
          </p>
          <Link to="/signup" className="button">Попробовать</Link>
          <img className="intro__illustration" src="./src/assets/phone.png" alt="" />
        </section>
        <section id="features" className="features">
          <h2 className="visuallyhidden">Возможности</h2>
          <ul className="features__list">
            <li>
              <img className="feature_1" src='./src/assets/feature_1.png' />
              <p><strong>Следи за своими наличными и безналичными расходами </strong> в одном приложении</p>
            </li>
            <li>
             <img src="./src/assets/feature_2.png"/>
              <p><strong>Легко добавляй наличные расходы </strong> в приложении</p>
            </li>
          <li>
           <img src="./src/assets/feature_3.png"/>
            <p><strong>Анализируй свои расходы  </strong> в одном месте</p>
          </li>
        </ul>
      </section>
      </main>
      </div> 
    ); 
}

export default Landing;