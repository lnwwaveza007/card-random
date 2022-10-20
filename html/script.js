$(function () {
	function display(bool){
		if (bool) {
			$("#container-full").show();
		}else{
			$("#container-full").hide();
		}
	}
	
	const numberLists = [
		['1', '2', '3', '4', '5'],
		['6', '7', '8', '9', '10']
	];



	const suits = [
		{
			icon: '♥',
			color: 'red'
		}
	];

	const positions = [];
	const spacing = 20;

	const container = document.getElementById('container');

	const shuffleBtn = document.getElementById('shuffle');

	suits.forEach((suit, suit_idx) => {
			numberLists.forEach((numbers, list_idx) => {
				numbers.forEach((number, number_idx) => {
					const cardDetails = {
						number, 
						suit, 
						suit_idx,
						list_idx,
						number_idx
					}
					createCard(cardDetails);
				});
			})
	})

	function createCard({number, suit, suit_idx, list_idx, number_idx}) {
		const cardContainer = document.createElement('div');
		const cardEl = document.createElement('div');
		

		cardContainer.classList.add('card-container');
		cardEl.classList.add('card');

		
		if(suit.color === 'red') {
			cardEl.classList.add('red');
		}

		const TOP = suit_idx * 175 + spacing * suit_idx + list_idx * 175 + spacing * list_idx + 'px';
		const LEFT = number_idx * 120 + spacing * number_idx + 'px';

		positions.push([TOP, LEFT]);
		cardContainer.style.top = TOP;
		cardContainer.style.left = LEFT;
		cardEl.innerHTML = `
			<figure class="back">
				<img height="175" width="120" src='./card/`+number+`.gif' alt="A description of what this image is">
			</figure>
			<figure class="front"></figure>
		`;

		cardContainer.append(cardEl);

		container.appendChild(cardContainer);
		$(cardContainer).hide();
	}

	const cardContainers = document.querySelectorAll('.card-container');
	cardContainers.forEach((cardContainer, idx) => {
			//setTimeout(() => {
				cardContainer.style.zIndex = -1;
				cardContainer.style.top = '50px';
				cardContainer.style.left = '41%';
			//}, 0);
			
		});
	
	
	shuffleBtn.addEventListener('click', () => {
		$(shuffleBtn).toggleClass('clicked')
		setTimeout(function (){
			Start();
		}, 800);
		//$(shuffleBtn).css({'-webkit-clip-path': 'inset(8% 0 0 0)'});
	});

	function shuffleBack() {
		// reset card
		const cards = document.getElementsByClassName("card");
		for (var i = 0; i < cards.length; i++) {
		   cards[i].classList.remove('clicked');
		}

		// shuffle the positions
		shufflePositions();

		cardContainers.forEach((cardContainer, idx) => {
			setTimeout(() => {
				cardContainer.style.top = positions[idx][0];
				cardContainer.style.left = positions[idx][1];
			}, idx * 100);
			
		});
	}

	function shufflePositions() {
		for (let i=0; i<1000; i++) {
			const rand1 = Math.floor(Math.random() * 10);
			const rand2 = Math.floor(Math.random() * 10);

			const temp = positions[rand1];
			positions[rand1] = positions[rand2];
			positions[rand2] = temp;
		}
	}

	$('.card-container .card').on('click', function() {
		$(this).toggleClass('clicked');
		$(this).css({'outline': '3px solid rgba(102, 204, 255, .5)'});
		var save = this;
		setTimeout(function (){
			$('.card-container .card').not($(save)).toggleClass('clicked');
		}, 1500);
		setTimeout(function (){
			location.reload();
		}, 5000);
	});

	//Pack
	function Start(){
		$(cardContainers).show();
		$(shuffleBtn).toggleClass('glow');
		cardContainers.forEach((cardContainer, idx) => {
			setTimeout(() => {
				cardContainer.style.top = '-1000px';
				$(shuffleBtn).toggleClass('effect');
			}, idx * 100);
		});
		setTimeout(() => {
			$(shuffleBtn).toggleClass('down');
		}, 1000);
		setTimeout(() => {
			$(shuffleBtn).hide();
			shuffleBack();
		}, 1400);
	}
})