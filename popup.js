/**
 * N予備校ページ内の総視聴必要時間を取得するプログラムです
 * 
 * @version 1.2.3
 * v1.0 ServiceWorkerからtabに向けてsendMessageでどうにか通信しようとしてた
 * v1.1 わざわざDevToolsに新規タブ追加してhtmlからダークモードの検出しようとしてた
 * v1.2 即時関数で包んだりscriptをファイルで分けたりした
 * v1.2.1 urlによってメッセージが変化するように
 * v1.2.2 コードの整形
 * v1.2.3 メッセージ関数を引数に渡すように
 * 
 * @todo デザイン面の変更 -> スタイル設定とか色々
 * @todo なんか連打すると止まる
 */

((response) => {
	const themeInfo = "(prefers-color-scheme: dark)";
	const imagePath = `images/calender_${window.matchMedia(themeInfo).matches ? "white" : "black"}_16.png`;
	const queryInfo = { active: true, currentWindow: true };

	chrome.action.setIcon({ path: imagePath });
	chrome.tabs.query(queryInfo, (tabs) => {
		const tab = tabs[0];
		const nicoUrl = /^https:\/\/www.nnn.ed.nico\//;
		const lessonUrl = /^https:\/\/www.nnn.ed.nico\/courses\/[0-9]+\//;

		// (正規表現).testでURLが一致しているか確かめる
		if (nicoUrl.test(tab.url)) {
			if (lessonUrl.test(tab.url)) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					files: ["snackbar.js", "content.js"]
				}).then(() => response("then"))
					.catch(error => response("catch", error));
			} else {
				response("nicoUrl");
			}
		} else {
			response("anotherUrl");
		}
	});
})((type, error) => {
	if (type == "catch") throw new Error(error);
	// 実行結果に応じてポップアップにメッセージを表示
	switch (type) {
		case "then":
			document.body.textContent = "取得に成功しました🎉";
			break;
		case "nicoUrl":
			document.body.style.width = "200px";
			document.body.textContent = "マイコースより授業を選択してから\n再度実行してください";
			break;
		case "anotherUrl":
			document.body.style.width = "200px";
			document.body.textContent = "N予備校のページで実行してください";
			break;
	}
	// 3000ms後にポップアップを閉じる
	setInterval(window.close, 3000);
});