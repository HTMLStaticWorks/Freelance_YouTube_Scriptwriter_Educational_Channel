/**
 * scriptflow - Dashboard Charts JS
 * Centralized chart initialization and management
 */

const DashboardCharts = (() => {
    // Shared Colors
    const getColors = () => {
        const isLight = document.body.classList.contains('light-mode');
        return {
            cyan: isLight ? '#0e7490' : '#06B6D4',
            cyanMuted: isLight ? 'rgba(14, 116, 144, 0.1)' : 'rgba(6, 182, 212, 0.1)',
            cyanHalf: isLight ? 'rgba(14, 116, 144, 0.4)' : 'rgba(6, 182, 212, 0.3)',
            grid: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
            text: isLight ? '#0f172a' : '#94a3b8',
            textHeading: isLight ? '#0f172a' : '#ffffff',
            accent: '#f59e0b', // Amber
            danger: '#ef4444'  // Red
        };
    };

    // Shared Options
    const getCommonOptions = () => {
        const colors = getColors();
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // We use custom legends usually
                },
                tooltip: {
                    backgroundColor: document.body.classList.contains('light-mode') ? '#fff' : '#0f172a',
                    titleColor: colors.cyan,
                    bodyColor: colors.text,
                    borderColor: colors.cyanMuted,
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    usePointStyle: true
                }
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: colors.text, font: { family: 'Inter', size: 11 } }
                },
                y: {
                    grid: { color: colors.grid, drawBorder: false },
                    ticks: { color: colors.text, font: { family: 'Inter', size: 11 } }
                }
            }
        };
    };

    // Gradient Helper
    const createGradient = (ctx, colorStart, colorEnd) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        return gradient;
    };

    /**
     * Initialize Overview Charts
     */
    const initOverviewCharts = () => {
        const velocityCtx = document.getElementById('velocityChart')?.getContext('2d');
        if (velocityCtx) {
            const colors = getColors();
            const gradient = createGradient(velocityCtx, colors.cyanHalf, 'rgba(6, 182, 212, 0)');
            
            new Chart(velocityCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Scripts Produced',
                        data: [8, 12, 10, 15, 12, 18],
                        borderColor: colors.cyan,
                        backgroundColor: gradient,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: colors.cyan,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }]
                },
                options: getCommonOptions()
            });
        }

        const taskCtx = document.getElementById('taskDistributionChart')?.getContext('2d');
        if (taskCtx) {
            const colors = getColors();
            new Chart(taskCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Research', 'Writing', 'Editing', 'VO'],
                    datasets: [{
                        data: [35, 40, 15, 10],
                        backgroundColor: [
                            colors.cyan,
                            '#22d3ee',
                            '#0891b2',
                            '#155e75'
                        ],
                        borderWidth: 0,
                        hoverOffset: 15
                    }]
                },
                options: {
                    ...getCommonOptions(),
                    cutout: '75%',
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }
    };

    /**
     * Initialize Analytics Charts
     */
    const initAnalyticsCharts = () => {
        const retentionCtx = document.getElementById('retentionChart')?.getContext('2d');
        if (retentionCtx) {
            const colors = getColors();
            const gradient = createGradient(retentionCtx, colors.cyanHalf, 'rgba(6, 182, 212, 0)');
            
            new Chart(retentionCtx, {
                type: 'line',
                data: {
                    labels: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00'],
                    datasets: [{
                        label: 'Retention %',
                        data: [100, 85, 78, 72, 68, 65, 62, 60],
                        borderColor: colors.cyan,
                        backgroundColor: gradient,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 4,
                        pointRadius: 0,
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    ...getCommonOptions(),
                    scales: {
                        ...getCommonOptions().scales,
                        y: {
                            ...getCommonOptions().scales.y,
                            min: 0,
                            max: 100,
                            ticks: { callback: (value) => value + '%' }
                        }
                    }
                }
            });
        }

        const topicCtx = document.getElementById('topicChart')?.getContext('2d');
        if (topicCtx) {
            const colors = getColors();
            new Chart(topicCtx, {
                type: 'bar',
                data: {
                    labels: ['History', 'Science', 'Finance', 'Tech'],
                    datasets: [{
                        label: 'Avg Minutes',
                        data: [12, 19, 15, 17],
                        backgroundColor: colors.cyan,
                        borderRadius: 8,
                        hoverBackgroundColor: '#22d3ee'
                    }]
                },
                options: getCommonOptions()
            });
        }

        const trafficCtx = document.getElementById('trafficPieChart')?.getContext('2d');
        if (trafficCtx) {
            const colors = getColors();
            new Chart(trafficCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Search', 'Suggested', 'Browse', 'Other'],
                    datasets: [{
                        data: [45, 30, 15, 10],
                        backgroundColor: [colors.cyan, '#22d3ee', '#0891b2', '#334155'],
                        borderWidth: 0
                    }]
                },
                options: {
                    ...getCommonOptions(),
                    cutout: '70%'
                }
            });
        }
        
        const comparisonCtx = document.getElementById('comparisonChart')?.getContext('2d');
        if (comparisonCtx) {
            const colors = getColors();
            new Chart(comparisonCtx, {
                type: 'radar',
                data: {
                    labels: ['Pacing', 'Visuals', 'Script', 'VO', 'Audio'],
                    datasets: [{
                        label: 'You',
                        data: [90, 85, 95, 80, 75],
                        borderColor: colors.cyan,
                        backgroundColor: colors.cyanMuted,
                    }, {
                        label: 'Avg',
                        data: [70, 75, 70, 75, 80],
                        borderColor: colors.text,
                        backgroundColor: 'rgba(148, 163, 184, 0.1)',
                    }]
                },
                options: {
                    ...getCommonOptions(),
                    scales: {
                        r: {
                            grid: { color: colors.grid },
                            angleLines: { color: colors.grid },
                            pointLabels: { color: colors.text, font: { size: 10 } },
                            ticks: { display: false }
                        }
                    }
                }
            });
        }
    };

    /**
     * Initialize Projects Charts
     */
    const initProjectsCharts = () => {
        const pipelineCtx = document.getElementById('pipelineChart')?.getContext('2d');
        if (pipelineCtx) {
            const colors = getColors();
            new Chart(pipelineCtx, {
                type: 'bar',
                data: {
                    labels: ['Research', 'Drafting', 'Review', 'Approved'],
                    datasets: [{
                        label: 'Projects',
                        data: [4, 2, 3, 1],
                        backgroundColor: [
                            'rgba(6, 182, 212, 0.6)',
                            'rgba(6, 182, 212, 0.7)',
                            'rgba(6, 182, 212, 0.8)',
                            'rgba(6, 182, 212, 1)'
                        ],
                        borderRadius: 12
                    }]
                },
                options: {
                    ...getCommonOptions(),
                    indexAxis: 'y',
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }
    };

    return {
        init: () => {
            initOverviewCharts();
            initAnalyticsCharts();
            initProjectsCharts();
        },
        refresh: () => {
            // Logic to destroy and recreate charts on theme change if needed
            // For now, simple page reload or dynamic color update
        }
    };
})();
