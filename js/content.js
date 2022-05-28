/*!
 * Schedule Helper for N/S students v1.2.4
 * https://github.com/Adr204/NyobiScheduleHelper
 * 
 * Copyright 2022 Adr204
 * Released under the MIT license
 * https://github.com/Adr204/NyobiScheduleHelper/blob/main/LICENSE
 */

(() => {
	const movies = document.getElementsByClassName("movie");
	const cat = {
		watched: 0,
		unwatched: 0,
		supplement: 0
	};
	function timeFormat(time) {
		const hour = Math.floor(time / 3600);
		const minute = Math.floor(time / 60) % 60;
		const second = time % 60;
	
		return `${hour}時間 ${minute}分 ${second}秒`;
	}

	for (const movie of movies) {
		const tag = movie.className;
		const lenStr = movie.getElementsByClassName("movie-length")[0].textContent;
		const lenArr = lenStr.split(':').reverse();
		
		let length = 0;
		for(let i = 0; i < lenArr.length; i++) length += lenArr[i] * (60 ** i);

		switch (tag) {
			case "movie good":
				cat.watched += length;
				break;
			case "movie":
				cat.unwatched += length;
				break;
			case "movie supplement":
			case "movie supplement good":
				cat.supplement += length;
				break;
			default:
				console.error(`不明な種類の動画が含まれています\n${tag}`);
				break;
		}
	}

	if(cat.unwatched) Snackbar.show({text: `このページの動画は ${timeFormat(cat.unwatched)}が未視聴です`});
	else Snackbar.show({text:`このページの動画は全て視聴済みです`});
	return cat;
})();