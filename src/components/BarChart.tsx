'use client'

import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js'
import { format, parseISO } from 'date-fns'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
    data: {
        estimated_value: string
        purchase_price: string
        created_at: string
    }[]
}

export function BarChart({ data }: Props) {
    // Regrouper par mois (ex: Mai 2025)
    const monthlyData: { [month: string]: { estimated: number, purchase: number } } = {}

    data.forEach(item => {
        if (!item.created_at) {
            console.warn('Date manquante pour une carte:', item)
            return
        }

        try {
            const date = parseISO(item.created_at)
            const month = format(date, 'MMMM yyyy')

            if (!monthlyData[month]) {
                monthlyData[month] = { estimated: 0, purchase: 0 }
            }

            monthlyData[month].estimated += parseFloat(item.estimated_value)
            monthlyData[month].purchase += parseFloat(item.purchase_price)
        } catch (err) {
            console.error('Erreur de parsing de date pour:', item.created_at, err)
        }
    })

    const labels = Object.keys(monthlyData)

    const estimatedData = labels.map(month => monthlyData[month].estimated)
    const purchaseData = labels.map(month => monthlyData[month].purchase)

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Prix d\'achat',
                data: purchaseData,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
            },
            {
                label: 'Valeur estimée',
                data: estimatedData,
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
            }
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Évolution des prix par mois',
            },
        },
    }

    return <Bar options={options} data={chartData} />
}
