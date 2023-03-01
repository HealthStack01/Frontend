export const chartoptions = {
	chart: {
		toolbar: { show: false },
		zoom: { enabled: false },
		curve: 'smooth',
	},

	// States
	states: {
		hover: {
			filter: {
				type: 'lighten',
				value: 0.04,
			},
		},
		active: {
			filter: {
				type: 'darken',
				value: 0.88,
			},
		},
	},
	// Fill
	fill: {
		opacity: 1,
		gradient: {
			type: 'vertical',
			shadeIntensity: 0,
			opacityFrom: 0.4,
			opacityTo: 0,
			stops: [0, 100],
		},
	},

	// Datalabels
	dataLabels: { enabled: false },
	// Grid
	grid: {
		show: false,
		strokeDashArray: 3,
		borderColor: 'grey',
	},
	// Xaxis
	// Markers
	markers: {
		size: 0,
		strokeColors: 'white',
	},
	// Tooltip
	tooltip: {
		x: {
			show: false,
		},
		y: {
			formatter: function (y: number) {
				if (typeof y !== 'undefined') {
					return y.toFixed(0) + ' points';
				}
				return y;
			},
		},
	}, // plotOptions
	plotOptions: {
		// Bar
		bar: {
			columnWidth: '80%',
			borderRadius: 4,
		},
	},
};
