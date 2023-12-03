import { useEffect, useState } from "react";

async function fetchVerse(name) {
  const request = await fetch(`https://api.nationalize.io?name=${name}`);
  const data = await request.json();
  return data.country;
}

export default function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const newData = await fetchVerse(name);
      setData(newData);
    })();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const get_name = event.target.elements.customname.value;
    const newData = await fetchVerse(get_name);
    setData(newData);
    setName(get_name);
  }

  console.log(data);

  return (
    <>
      <header className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Estimate the nationality</h1>
          </div>
        </div>
      </header>
      <main>
        <section className="section">
          <div className="container">
            <form className="enter-block" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="customname">Enter custom name:</label>
                <input
                  type="text"
                  name="customname"
                  className="input is-info is-small"
                  placeholder=""
                />
              </div>
              <div>
                <button
                  className="button is-link is-light is-small"
                  type="submit"
                >
                  Estimate the nationality
                </button>
              </div>
            </form>
            <div className="country">
              <p>入力した名前: {name}</p>
              <div className="predicted-country">
                <div>予測された国:&ensp;</div>
                <div className="country-code">
                  {data.map((d) => {
                    return (
                      <div className="country-name" key={d.country_id}>
                        <div>{d.country_id}&ensp;</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <p>
              国名コード表:
              <a href="https://iss.ndl.go.jp/help/help_ja/help_country_codes.html">
                国名コード一覧 - 国立国会図書館サーチ
              </a>
            </p>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            from&ensp;
            <a href="https://nationalize.io/">nationalize.io</a>
          </p>
          <p>
            日本大学文理学部情報科学科 Webプログラミングの演習課題
            <br></br> 学生証番号: 5422012 氏名: 関 遥菜
          </p>
        </div>
      </footer>
    </>
  );
}
