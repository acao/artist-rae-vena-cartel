/**
 * Infinite Scroll + Masonry + ImagesLoaded
 */
(function() {

	// Main content container
	var $container = $('#products');

	// Masonry + ImagesLoaded
	$container.imagesLoaded(function(){
		$container.packery({
			// selector for entry content
			itemSelector: '.product',
			columnWidth: 320
		});
	});

	// Infinite Scroll
	$container.infinitescroll({

		// selector for the paged navigation (it will be hidden)
		navSelector  : "#pagination",
		// selector for the NEXT link (to page 2)
		nextSelector : "a.next",
		// selector for all items you'll retrieve
		itemSelector : ".product",

		// finished message
		loading: {
			finishedMsg: 'No more pages to load.'
			}
		},

		// Trigger Masonry as a callback
		function( newElements ) {
			// hide new items while they are loading
			var $newElems = $( newElements ).css({ opacity: 0 });
			// ensure that images load before adding to masonry layout
			$newElems.imagesLoaded(function(){
				// show elems now they're ready
				$newElems.animate({ opacity: 1 });
				$container.packery( 'appended', $newElems, true );
			});

	});

	/**
	 * OPTIONAL!
	 * Load new pages by clicking a link
	 */

	// Pause Infinite Scroll
	$(window).unbind('.infscr');

	// Resume Infinite Scroll
	$(nextSelector).click(function(){
		$container.infinitescroll('retrieve');
		return false;
	});

})();
