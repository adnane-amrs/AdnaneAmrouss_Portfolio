import type { ProjectVisualKind } from "@/content";
import styles from "./ProjectVisual.module.css";

const stageTone: Record<ProjectVisualKind, string> = {
  mobile: styles.lime,
  detection: styles.lavender,
  classification: styles.sage,
  lineage: styles.sky,
  airflow: styles.ice,
  sql: styles.butter,
  chart: styles.blush,
  predictor: styles.peach,
};

/**
 * Product-style mockups for the project cards. Everything inside is sized in container
 * units, so a mockup scales with its card. By convention the first child is the main
 * window and the last child the floating dark card (the card hover animates both).
 */
export function ProjectVisual({ variant, className = "" }: { variant: ProjectVisualKind; className?: string }) {
  return (
    <div className={`${styles.stage} ${stageTone[variant]} ${className}`} aria-hidden>
      {variant === "mobile" && <Mobile />}
      {variant === "detection" && <Detection />}
      {variant === "classification" && <Classification />}
      {variant === "lineage" && <Lineage />}
      {variant === "airflow" && <Airflow />}
      {variant === "sql" && <Sql />}
      {variant === "chart" && <Chart />}
      {variant === "predictor" && <Predictor />}
    </div>
  );
}

function TitleBar({ title }: { title: string }) {
  return (
    <div className={styles.titlebar}>
      <span />
      <span />
      <span />
      <p>{title}</p>
    </div>
  );
}

/* ---------- RevZone: two phone screens ---------- */

function Car({ color = "#d9d9de" }: { color?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={styles.carSvg}>
      <path
        d="M8 28c0-6 6-8 14-9l16-9c4-2 10-3 18-3h18c8 0 14 2 20 7l8 5c8 1 14 4 14 9v3H8Z"
        fill={color}
      />
      <path d="M42 12h14v8H32Zm18 0h12c5 0 9 2 13 6l2 2H60Z" fill="#1c1c20" opacity="0.55" />
      <circle cx="30" cy="31" r="6.5" fill="#111" />
      <circle cx="30" cy="31" r="2.6" fill="#777" />
      <circle cx="92" cy="31" r="6.5" fill="#111" />
      <circle cx="92" cy="31" r="2.6" fill="#777" />
    </svg>
  );
}

function Mobile() {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const range = [12, 13, 14, 15];
  const booked = [5, 6, 20, 21];

  return (
    <>
      <div className={styles.phones}>
        {/* Renter: explore screen, dark */}
        <div className={`${styles.phone} ${styles.phoneDark}`}>
          <div className={styles.screen}>
            <div className={styles.statusBar}>
              <span>9:41</span>
              <i />
            </div>
            <p className={styles.appTitle}>Explore</p>
            <div className={styles.search}>Marrakech · 12 – 15 Dec</div>
            <div className={styles.pills}>
              <span className={styles.pillOn}>Automatic</span>
              <span>Diesel</span>
              <span>5 seats</span>
            </div>
            {[
              { name: "Dacia Duster", price: "350 MAD", color: "#c9ccd6", tone: "#2c2f3a" },
              { name: "Peugeot 208", price: "290 MAD", color: "#e7e2d6", tone: "#3a3329" },
            ].map((car) => (
              <div key={car.name} className={styles.carCard}>
                <div className={styles.carImg} style={{ background: `linear-gradient(160deg, ${car.tone}, #17171b)` }}>
                  <Car color={car.color} />
                </div>
                <div className={styles.carRow}>
                  <span>{car.name}</span>
                  <span className={styles.rating}>★ 4.9</span>
                </div>
                <p className={styles.carPrice}>
                  {car.price}
                  <span> / day</span>
                </p>
              </div>
            ))}
            <div className={styles.tabBar}>
              <span className={styles.tabOn} />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        {/* Booking screen, light */}
        <div className={`${styles.phone} ${styles.phoneLight}`}>
          <div className={styles.screenLight}>
            <div className={styles.bookHead}>
              <div className={`${styles.statusBar} ${styles.statusOnDark}`}>
                <span>9:41</span>
                <i />
              </div>
              <p className={styles.appTitle}>Book</p>
              <p className={styles.bookCar}>Dacia Duster · 2023</p>
            </div>
            <div className={styles.calendar}>
              <p className={styles.calMonth}>December</p>
              <div className={styles.calGrid}>
                {days.map((d) => (
                  <span
                    key={d}
                    className={range.includes(d) ? styles.dayOn : booked.includes(d) ? styles.dayOff : undefined}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.summary}>
              <span>3 days</span>
              <strong>1,050 MAD</strong>
            </div>
            <span className={styles.bookBtn}>Request to book</span>
          </div>
        </div>
      </div>

      <div className={`${styles.float} ${styles.mobFloat}`}>
        <p className={styles.floatLabel}>Booking request</p>
        <p className={styles.mobStatus}>Accepted ✓</p>
        <p className={styles.floatText}>Owner replied · 2 min ago</p>
      </div>
    </>
  );
}

/* ---------- TMS: document detection ---------- */

function Detection() {
  const docs = [
    { name: "Carte grise", status: "Done", color: "#8b7cf6" },
    { name: "Permis", status: "Done", color: "#5cc98a" },
    { name: "Facture", status: "Running", color: "#ff9a5c" },
    { name: "CIN", status: "Queued", color: "#d9d9d6" },
    { name: "Assurance", status: "Queued", color: "#d9d9d6" },
  ];
  const boxes = [
    { label: "ID", cls: styles.boxId },
    { label: "NAME", cls: styles.boxName },
    { label: "DATE", cls: styles.boxDate },
    { label: "PLATE", cls: styles.boxPlate },
  ];
  const lines = [62, 40, 78, 55, 70, 34, 66, 48];

  return (
    <>
      <div className={`${styles.window} ${styles.detWindow}`}>
        <TitleBar title="tms-extract" />
        <div className={styles.detBody}>
          <aside className={styles.sidebar}>
            <p className={styles.sideHead}>Documents</p>
            <ul>
              {docs.map((d) => (
                <li key={d.name}>
                  <span className={styles.sideDot} style={{ background: d.color }} />
                  <span className={styles.sideName}>{d.name}</span>
                  <span className={styles.sideStatus}>{d.status}</span>
                </li>
              ))}
            </ul>
          </aside>
          <div className={styles.detMain}>
            <div className={styles.mainHead}>
              <p>Scan 0412</p>
              <span>YOLOv11</span>
            </div>
            <div className={styles.doc}>
              {lines.map((w, i) => (
                <span key={i} className={styles.docLine} style={{ width: `${w}%` }} />
              ))}
              {boxes.map((b, i) => (
                <span key={b.label} className={`${styles.box} ${b.cls}`} style={{ animationDelay: `${i * 0.45}s` }}>
                  <em>{b.label}</em>
                </span>
              ))}
              <span className={styles.scan} />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.float} ${styles.detFloat}`}>
        <p className={styles.floatLabel}>Extracted</p>
        <p className={styles.floatValue}>4 of 4</p>
        <p className={styles.floatText}>fields → TMS record</p>
        <div className={styles.segments}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>
              <i style={{ animationDelay: `${0.3 + i * 0.45}s` }} />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------- NLP: document classification ---------- */

function Classification() {
  const classes = [
    { name: "Invoice", value: 92, cls: styles.barMain },
    { name: "Contract", value: 5, cls: "" },
    { name: "Report", value: 3, cls: "" },
  ];
  const spark = [38, 52, 45, 63, 58, 74, 81, 92];
  const recent = [
    { file: "contract_017.pdf", label: "Contract", score: "97%", color: "#e3dcfb" },
    { file: "invoice_2291.txt", label: "Invoice", score: "94%", color: "#d6ecd9" },
    { file: "report_q2.pdf", label: "Report", score: "91%", color: "#fbe3d3" },
    { file: "invoice_2290.pdf", label: "Invoice", score: "89%", color: "#d6ecd9" },
  ];

  return (
    <>
      <div className={`${styles.window} ${styles.clsWindow}`}>
        <TitleBar title="doc-classifier — gradio" />
        <div className={styles.clsBody}>
          <div>
            <p className={styles.fieldLabel}>Upload</p>
            <div className={styles.drop}>
              <span className={styles.file}>
                <span className={styles.fileIcon}>PDF</span>
                <span className={styles.fileName}>report_q3.pdf</span>
              </span>
            </div>
            <span className={styles.classify}>Classify</span>
          </div>
          <div>
            <p className={styles.fieldLabel}>Prediction</p>
            <p className={styles.prediction}>Invoice</p>
            <ul className={styles.bars}>
              {classes.map((c) => (
                <li key={c.name}>
                  <div className={styles.barHead}>
                    <span>{c.name}</span>
                    <span>{c.value}%</span>
                  </div>
                  <span className={styles.barTrack}>
                    <i className={c.cls} style={{ width: `${c.value}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.history}>
            <p className={styles.fieldLabel}>Recent</p>
            <ul>
              {recent.map((r) => (
                <li key={r.file}>
                  <span className={styles.historyFile}>{r.file}</span>
                  <span className={styles.historyTag} style={{ background: r.color }}>
                    {r.label}
                  </span>
                  <span className={styles.historyScore}>{r.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`${styles.float} ${styles.clsFloat}`}>
        <p className={styles.floatLabel}>1D CNN</p>
        <p className={styles.floatValue}>92%</p>
        <p className={styles.floatText}>confidence</p>
        <div className={styles.spark}>
          {spark.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={i === spark.length - 1 ? styles.sparkLast : ""} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------- Olist: dbt lineage graph ---------- */

function Lineage() {
  // Node positions in container units inside the graph area (64 × 30).
  const raw = ["orders", "order_items", "customers", "payments"];
  const stg = ["stg_orders", "stg_order_items", "stg_customers", "stg_payments"];
  const rowY = (i: number) => 1 + i * 6;
  const marts = [
    { name: "fct_orders", y: 5, from: [0, 1, 3] },
    { name: "dim_customers", y: 15, from: [2] },
  ];
  const bars = [30, 42, 38, 55, 61, 58, 72, 80, 76, 92];

  return (
    <>
      <div className={`${styles.window} ${styles.linWindow}`}>
        <TitleBar title="dbt docs — lineage" />
        <div className={styles.linBody}>
          <div className={styles.linCols}>
            <span>raw</span>
            <span>staging</span>
            <span>marts</span>
          </div>
          <div className={styles.graph}>
            <svg viewBox="0 0 64 23" preserveAspectRatio="none" className={styles.edges}>
              {raw.map((_, i) => (
                <path key={`r${i}`} d={`M17 ${rowY(i) + 1.6}H23`} />
              ))}
              {marts.flatMap((m) =>
                m.from.map((i) => (
                  <path
                    key={`${m.name}${i}`}
                    d={`M38 ${rowY(i) + 1.6}C41 ${rowY(i) + 1.6} 41 ${m.y + 1.6} 44 ${m.y + 1.6}`}
                  />
                )),
              )}
            </svg>
            {raw.map((n, i) => (
              <span key={n} className={`${styles.node} ${styles.nodeRaw}`} style={{ left: "2cqw", top: `${rowY(i)}cqw` }}>
                {n}
              </span>
            ))}
            {stg.map((n, i) => (
              <span key={n} className={`${styles.node} ${styles.nodeStg}`} style={{ left: "23cqw", top: `${rowY(i)}cqw` }}>
                {n}
              </span>
            ))}
            {marts.map((m) => (
              <span key={m.name} className={`${styles.node} ${styles.nodeMart}`} style={{ left: "44cqw", top: `${m.y}cqw` }}>
                {m.name}
              </span>
            ))}
          </div>
          <div className={styles.tests}>
            <span className={styles.testOk}>✓ unique</span>
            <span className={styles.testOk}>✓ not_null</span>
            <span className={styles.testOk}>✓ accepted_values</span>
          </div>
          <pre className={styles.log}>
            <span className={styles.kwDim}>$</span> uv run dbt build --profiles-dir .{"\n"}
            Building staging views…{"\n"}
            Building marts tables…{"\n"}
            Running data tests…{"\n"}
            <span className={styles.okText}>Completed successfully</span>
          </pre>
        </div>
      </div>

      <div className={`${styles.float} ${styles.linFloat}`}>
        <p className={styles.floatLabel}>Metabase</p>
        <p className={styles.floatTitle}>Revenue by month</p>
        <div className={styles.spark}>
          {bars.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={i === bars.length - 1 ? styles.sparkLast : ""} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------- Snowflake + Airflow: DAG runs ---------- */

function Airflow() {
  const runs = Array.from({ length: 14 }, (_, i) => i);
  const spark = [40, 46, 44, 52, 60, 57, 66, 70, 68, 78];
  const durations = [62, 48, 70, 55, 58, 66, 44, 72, 60, 52, 68, 57, 63, 50];

  return (
    <>
      <div className={`${styles.window} ${styles.airWindow}`}>
        <TitleBar title="airflow — DAGs" />
        <div className={styles.airBody}>
          <div className={styles.airHead}>
            <p>dbt_snowflake_pipeline</p>
            <span>@daily</span>
            <span className={styles.airOk}>success</span>
          </div>
          <div className={styles.dag}>
            <span className={styles.task}>
              <i />
              dbt_run
            </span>
            <span className={styles.dagArrow} />
            <span className={styles.task}>
              <i />
              dbt_test
            </span>
          </div>
          <p className={styles.fieldLabel}>Runs</p>
          <div className={styles.runGrid}>
            {runs.map((r) => (
              <span key={r} className={styles.runCol}>
                <i style={{ animationDelay: `${r * 0.08}s` }} />
                <i style={{ animationDelay: `${r * 0.08 + 0.04}s` }} />
              </span>
            ))}
          </div>
          <div className={styles.runLabels}>
            <span>dbt_run</span>
            <span>dbt_test</span>
          </div>
          <p className={styles.fieldLabel}>Task duration</p>
          <div className={styles.durations}>
            {durations.map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.float} ${styles.airFloat}`}>
        <p className={styles.floatLabel}>Snowflake</p>
        <p className={styles.floatMono}>fct_daily_order_revenue</p>
        <div className={styles.spark}>
          {spark.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={i === spark.length - 1 ? styles.sparkLast : ""} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------- dbt + DuckDB: query & results ---------- */

function Sql() {
  const rows = [
    { term: "data analyst", w: 92 },
    { term: "data engineer", w: 71 },
    { term: "data scientist", w: 58 },
    { term: "ml engineer", w: 34 },
    { term: "business analyst", w: 27 },
    { term: "cloud engineer", w: 21 },
    { term: "data architect", w: 15 },
  ];

  return (
    <>
      <div className={`${styles.window} ${styles.sqlWindow}`}>
        <TitleBar title="duckdb — dev.duckdb" />
        <div className={styles.sqlBody}>
          <pre className={styles.code}>
            <span className={styles.kw}>SELECT</span> search_term, <span className={styles.fn}>COUNT</span>(*){" "}
            <span className={styles.kw}>AS</span> postings{"\n"}
            <span className={styles.kw}>FROM</span> main.job_posting{"\n"}
            <span className={styles.kw}>GROUP BY</span> 1 <span className={styles.kw}>ORDER BY</span> 2{" "}
            <span className={styles.kw}>DESC</span>;
          </pre>
          <div className={styles.result}>
            <div className={styles.resultHead}>
              <span>search_term</span>
              <span>postings</span>
            </div>
            {rows.map((r) => (
              <div key={r.term} className={styles.resultRow}>
                <span>{r.term}</span>
                <span className={styles.resultBar}>
                  <i style={{ width: `${r.w}%` }} />
                </span>
              </div>
            ))}
            <p className={styles.resultFoot}>{rows.length} rows</p>
          </div>
        </div>
      </div>

      <div className={`${styles.float} ${styles.sqlFloat}`}>
        <p className={styles.floatLabel}>Parquet → DuckDB</p>
        <p className={styles.floatValue}>843k</p>
        <p className={styles.floatText}>job postings · 12 months</p>
      </div>
    </>
  );
}

/* ---------- Moroccan e-commerce: analysis dashboard ---------- */

function Chart() {
  const cities = [
    { name: "Casablanca", w: 94 },
    { name: "Rabat", w: 72 },
    { name: "Marrakech", w: 63 },
    { name: "Tanger", w: 51 },
    { name: "Fès", w: 44 },
    { name: "Agadir", w: 36 },
  ];
  const months = [38, 44, 41, 52, 49, 58, 63, 60, 68, 74, 82, 95];

  return (
    <>
      <div className={`${styles.window} ${styles.chartWindow}`}>
        <TitleBar title="02_exploratory_data_analysis.ipynb" />
        <div className={styles.chartBody}>
          <div>
            <p className={styles.fieldLabel}>Sales by city</p>
            <ul className={styles.hbars}>
              {cities.map((c, i) => (
                <li key={c.name}>
                  <span>{c.name}</span>
                  <span className={styles.hbarTrack}>
                    <i style={{ width: `${c.w}%`, animationDelay: `${i * 0.1}s` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.donutWrap}>
            <p className={styles.fieldLabel}>Payment method</p>
            <div className={styles.donut} />
            <ul className={styles.legend}>
              <li>
                <i style={{ background: "#e0567d" }} />
                Cash
              </li>
              <li>
                <i style={{ background: "#f3a6bd" }} />
                Installments
              </li>
              <li>
                <i style={{ background: "#f6dbe3" }} />
                Card
              </li>
            </ul>
          </div>
          <div className={styles.monthly}>
            <p className={styles.fieldLabel}>Monthly sales</p>
            <div className={styles.monthBars}>
              {months.map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.float} ${styles.chartFloat}`}>
        <p className={styles.floatLabel}>Random Forest</p>
        <p className={styles.floatTitle}>Profitable order?</p>
        <p className={styles.mobStatus}>Yes ✓</p>
      </div>
    </>
  );
}

/* ---------- House prices: Streamlit predictor ---------- */

function Predictor() {
  // Deterministic scatter so server and client render the same points.
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const points = Array.from({ length: 34 }, () => {
    const x = 6 + rand() * 86;
    const y = 88 - x * 0.7 - rand() * 22;
    return { x, y: Math.max(6, Math.min(90, y)) };
  });
  const sliders = [
    { label: "Living area", value: "1,500 sq ft", pos: 22 },
    { label: "Bedrooms", value: "3", pos: 40 },
    { label: "Overall quality", value: "6 / 10", pos: 55 },
    { label: "Year sold", value: "2010", pos: 22 },
  ];

  return (
    <>
      <div className={`${styles.window} ${styles.predWindow}`}>
        <TitleBar title="streamlit — House Price Predictor" />
        <div className={styles.predBody}>
          <aside className={styles.predSide}>
            <p className={styles.sideHead}>Property attributes</p>
            {sliders.map((s) => (
              <div key={s.label} className={styles.slider}>
                <div className={styles.sliderHead}>
                  <span>{s.label}</span>
                  <span>{s.value}</span>
                </div>
                <span className={styles.sliderTrack}>
                  <i style={{ width: `${s.pos}%` }} />
                  <b style={{ left: `${s.pos}%` }} />
                </span>
              </div>
            ))}
          </aside>
          <div className={styles.predMain}>
            <p className={styles.fieldLabel}>Estimated market value</p>
            <p className={styles.price}>$182,400</p>
            <div className={styles.scatter}>
              {points.map((p, i) => (
                <span key={i} style={{ left: `${p.x}%`, top: `${p.y}%` }} />
              ))}
              <span className={styles.you} style={{ left: "34%", top: "52%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.float} ${styles.predFloat}`}>
        <p className={styles.floatLabel}>Model</p>
        <p className={styles.floatTitle}>Random Forest</p>
        <p className={styles.floatText}>loaded with joblib · live</p>
      </div>
    </>
  );
}
