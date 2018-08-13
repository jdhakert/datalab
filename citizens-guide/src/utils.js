import { select } from 'd3-selection';

const d3 = { select };

export function getElementBox(d3Selection) {
    const rect = d3Selection.node().getBoundingClientRect();

    return {
        width: Math.ceil(rect.width),
        height: Math.ceil(rect.height),
        right: Math.ceil(rect.right)
    }
}

export function translator(x, y) {
    return `translate(${x}, ${y})`
}

export function getTransform(d3Selection) {
    const re = /(\d)+/g
    const originalTransform = d3Selection.attr('transform').match(re);

    return {
        x: Number(originalTransform[0]),
        y: Number(originalTransform[1])
    }
}

export function establishContainer() {
    const viz = d3.select('#viz');

    let svg = viz.select('svg');

    if (svg.size() === 0) {
        return viz.append('svg')
            .attr('shape-rendering', 'geometricPrecision')
            .attr('height', '400px')
            .attr('width', '1200px');
    } else {
        return svg;
    }
}

export function simplifyBillions(n) {
    const billion = 1000000000;

    return `$${Math.round(n / billion * 10) / 10} B`;
}

export function simplifyNumber(n) {
    const trillion = 1000000000000,
        billion = 1000000000,
        million = 1000000;

    let simplifier = million,
        letter = 'M';

    if (n > trillion) {
        simplifier = trillion;
        letter = 'T'
    } else if (n > billion) {
        simplifier = billion;
        letter = 'B';
    }

    return `$${Math.round(n / simplifier * 10) / 10} ${letter}`;    
}

export function wordWrap(text, maxWidth) {
    var words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1,
        y = text.attr("y"),
        tspan;

    tspan = text.text(null)
        .append("tspan")
        .attr("x", 0);
    // .attr("y", y);
    // .attr("dy", dy + "em");

    while (words.length > 0) {
        word = words.pop();
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > maxWidth) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
                .attr("x", 0)
                .attr("y", y)
                .attr("dy", lineHeight + "em")
                .text(word);
        }
    }
}

export function initDropShadow(){
 const svg = establishContainer(),
    filter = svg.append('defs').append('filter')
        .attr('id', 'drop1')

    filter.append('feDropShadow')
        .attr('dx', 0)
        .attr('dy', 0)
        .attr('stdDeviation', 5)
        .attr('flood-opacity', 0.2)
}