/* d3js for adding skills */
d3.json('js/skills.json').then(function(data) {
    var skills = {};
    skills.data = data;
    skills.container = d3.select('#skills-container');
    
//  create tiles shapes
    skills.tiles = skills.container.selectAll('#skills-container > div')
        .data(skills.data['skills'], function(d) { return d.id; });
    skills.tiles.exit().remove();
    var temp = skills.tiles.enter()
        .append('div')
        // load new content to details
        .on('click', function(d) { 
            // make visible
            $('#details-container').toggleClass('hidden', false);
        
            // add title
            $('#details-container > div > h1').html('Details zu ' + d.name);
        
            // add description items
            $('#details-container > div:nth-of-type(2) > ul').parent().toggleClass('hidden', (d.details.description.length == 0));
            $('#details-container > div:nth-of-type(2) > ul').empty();
            for (var i = 0; i < d.details.description.length; i++) {
                $('#details-container > div:nth-of-type(2) > ul').append('<li>' + d.details.description[i].text + '</li>');
                if ( d.details.description[i].link != "" && d.details.description[i].hasOwnProperty('link')) {
                    $('#details-container > div:nth-of-type(2) li:nth-of-type(' + i+1 + ')').wrap('<a href="' + d.details.description[i].link + '" />');
                }
            }
        
            // add project items
            $('#details-container > div:nth-of-type(3) > ul').parent().toggleClass('hidden', (d.details.projects.length == 0));
            $('#details-container > div:nth-of-type(3) > ul').empty();
            for (var i = 0; i < d.details.projects.length; i++) {
                $('#details-container > div:nth-of-type(3) > ul').append('<li>' + d.details.projects[i].text + '</li>');
                if ( d.details.projects[i].link != "" && d.details.projects[i].hasOwnProperty('link')) {
                    $('#details-container > div:nth-of-type(3) li:nth-of-type(' + i+1 + ')').wrap('<a href="' + d.details.projects[i].link + '" />');
                }
            }
        
            // add article items
            $('#details-container > div:nth-of-type(4) > ul').parent().toggleClass('hidden', (d.details.articles.length == 0));
            $('#details-container > div:nth-of-type(4) > ul').empty();
            for (var i = 0; i < d.details.articles.length; i++) {
                $('#details-container > div:nth-of-type(4) > ul').append('<li>' + d.details.articles[i].text + '</li>');
                if ( d.details.articles[i].link != "" && d.details.articles[i].hasOwnProperty('link')) {
                    $('#details-container > div:nth-of-type(4) li:nth-of-type(' + i+1 + ')').wrap('<a href="' + d.details.articles[i].link + '" />');
                }
            }

        })
        .attr('name', function(d) { return d.name; })
        .html(function(d) {
            return('<img src="img/' + d.icon + '" /><span>' + d.name + '</span><svg class="skills level-' + d.level + '" viewBox="0 0 58 10"><rect x="0" y="0" width="10" height="10" /><rect x="12" y="0" width="10" height="10" /><rect x="24" y="0" width="10" height="10" /><rect x="36" y="0" width="10" height="10" /><rect x="48" y="0" width="10" height="10" /></svg>');
        
        });
    temp.append('div')
        .attr('class', function(d) {
            if (d.details.articles.length + d.details.projects.length + d.details.description.length > 0) {
                return('details-counter');
            } else {
                return('details-counter hidden')
            }
        })
        .html(function(d) {
            return(d.details.articles.length + d.details.projects.length + d.details.description.length);
          });
    
    
});




/* add event listeners */
/* sort buttons */
$('.sort-button').on('click', function() {
    /* remove active class */
    $('.sort-button').each(function() {
        this.classList.remove('active');
    })
    
    /* add active class to 1 */
    $(this).addClass('active');
    
    /* resort */
    switch($(this).text()) {
        case 'zufällig':
            sortSkills(2);
            break;
        case 'nach Name':
            sortSkills(0);
            break;
        case 'nach Level':
            sortSkills(1);
            break;
    }    
});

/* click on item */
$('#skills-container > div').on('click', function() {
   console.log(this.name); 
});

/* close details */
$('#details-close').on('click', function() {
    $('#details-container').toggleClass('hidden');
})



/*  event handler for change in dropdown */
function sortSkills(value) {
    var orders = [];
    var texts = [];
    var i;
    switch(value) {
        case 0:
        /* by name */
            orders = [];
            texts = [];
            $('#skills-container > div > span').each(function(index) {
                texts.push($(this).text());
            });
            temp = [...texts];
            texts.sort();
            for (i = 0; i < texts.length; i++) {
                orders[i] = texts.indexOf(temp[i]);
            }
            break;
            
        case 1:
       /* by level */
            orders = [];
            texts = [];
            $('#skills-container > div > svg').each(function(index) {
                texts.push($(this).attr('class'));
            });
            temp = [...texts];
            texts.sort().reverse();

            for (i = 0; i < texts.length; i++) {
                orders[i] = texts.indexOf(temp[i]);
            }
            break;
            
        case 2:
        /* random */
            for (i = 0; i < $('#skills-container > div').length; i++) {
                orders[i] = Math.floor(100 * Math.random());
            }
            break;
    }
/* apply order */
    for (i = 1; i < orders.length + 2; i++) {
        $('#skills-container > div:nth-of-type(' + i + ')').css('order', orders[i-1]);
    }
}

