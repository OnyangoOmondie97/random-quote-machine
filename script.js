$(document).ready(function() {

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getQuote() {
        $.ajax({
            url: 'https://api.quotable.io/random',
            success: function(data) {
                const color = getRandomColor();
                
                // Color to body background
                $('body').css('background-color', color);
                
                // Color to text, quote icon
                $('.quote-text, .quote-text .fa-quote-left, #text').css('color', color);
                
                
                // Color to buttons
                $('.button').css('background-color', color);

                // Updating the Tweet href with the new quote
                $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + data.content + '" ' + data.author));
            },
            error: function() {
                $('#text').text("Sorry, there was an error fetching the quote.");
            }
        });
    }
    
    // Quote on page load
    getQuote();

    // Event listener for the new quote button
    $('#new-quote').click(getQuote);

    // New quote every 6 seconds (6000 milliseconds)
    setInterval(getQuote, 6000);
});
