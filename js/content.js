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
	class movieBox {
		constructor() {
			this.list = [];
			this.sum = 0;
		}
		push(data) {
			this.list.push(data);
			this.sum += data.length;
		}
		format() {
			const hour = Math.floor(this.sum / 3600);
			const minute = Math.floor(this.sum / 60) % 60;
			const second = this.sum % 60;
	
			return ` ${hour}時間 ${minute}分 ${second}秒`
		}
	}
	/** 
	 * @todo カテゴリ分けせずに一つのList型に統合してみる
	*/
	const cate = {
		watched: new movieBox(),
		unwatched: new movieBox(),
		supplement: new movieBox()
	};

	for (const movie of movies) {
		const tag = movie.classList;
		const data = {
			init: function(mov) {
				const lenStr = mov.getElementsByClassName("movie-length")[0].textContent;
				const lenArr = lenStr.split(':').map(e => Number(e));
				this.length = lenArr.reverse().reduce((prev, current, index) => prev + current * 60 ** index);
				this.title = mov.getElementsByClassName("title")[0].textContent;
				// supplementは常に閉じてるっぽい
				// なんで?
				this.isClosed = mov.childNodes[0].classList.contains("is-gate-closed");
			}
		}
		data.init(movie);
		// console.log(data);

		if(tag.contains("supplement")) {
			cate.supplement.push(data);
		} else if(tag.contains("good")) {
			cate.watched.push(data);
		} else {
			cate.unwatched.push(data);
		}
	}

	// console.log(cate.watched);
	// console.log(cate.unwatched);
	// console.log(cate.supplement);
	if(cate.unwatched.sum) Snackbar.show({text: `このページの動画は ${cate.unwatched.format()}が未視聴です`});
	else Snackbar.show({text:`このページの動画は全て視聴済みです`});
	return cate;
})();