import React from "react";

function Results({ data }) {
  if (!data) return null;

  const { ad_groups, keywords, suggested_cpc, pmax_themes } = data;

  const downloadCSV = () => {
    const rows = [
      ["Keyword", "Ad Group", "Avg Monthly Searches", "CPC Low", "CPC High", "Competition"],
      ...keywords.map((kw) => [
        kw.keyword,
        kw.ad_group,
        kw.avg_monthly_searches,
        kw.cpc_low,
        kw.cpc_high,
        kw.competition,
      ]),
    ];
    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sem_keywords.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Results</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Ad Groups</h3>
        <div className="flex flex-wrap gap-2">
          {ad_groups.map((group) => (
            <span key={group} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{group}</span>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Keywords</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 border">Keyword</th>
                <th className="px-2 py-1 border">Ad Group</th>
                <th className="px-2 py-1 border">Avg Monthly Searches</th>
                <th className="px-2 py-1 border">CPC Low</th>
                <th className="px-2 py-1 border">CPC High</th>
                <th className="px-2 py-1 border">Competition</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((kw, idx) => (
                <tr key={idx}>
                  <td className="px-2 py-1 border">{kw.keyword}</td>
                  <td className="px-2 py-1 border">{kw.ad_group}</td>
                  <td className="px-2 py-1 border">{kw.avg_monthly_searches}</td>
                  <td className="px-2 py-1 border">{kw.cpc_low}</td>
                  <td className="px-2 py-1 border">{kw.cpc_high}</td>
                  <td className="px-2 py-1 border">{kw.competition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
          onClick={downloadCSV}
        >
          Download CSV
        </button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Suggested CPC for Shopping</h3>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded">₹{suggested_cpc}</div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Suggested PMax Themes</h3>
        <div className="flex flex-wrap gap-2">
          {pmax_themes.map((theme) => (
            <span key={theme} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{theme}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
