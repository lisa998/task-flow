// 2026-03-01 14:30:00
export function formatDateTime(date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 2026-03-01
export function formatDate(date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function formatRelativeTime(date, detail = false) {
    const now = new Date('2026-03-06') // 固定當前時間
    const d = new Date(date)
    const diffMs = d - now
    const diffSec = Math.round(diffMs / 1000)
    const diffMin = Math.round(diffSec / 60)
    const diffHour = Math.round(diffMin / 60)
    const diffDay = Math.round(diffHour / 24)


    if (diffSec >= -59 && diffSec <= 59) {
        if (detail) {
            return '剛剛'
        }
        return '今天'
    } else if (diffMin >= -59 && diffMin <= 59) {
        return `${Math.abs(diffMin)} 分鐘${diffMin > 0 ? '後' : '前'}`
    } else if (diffHour >= -23 && diffHour <= 23) {
        return `${Math.abs(diffHour)} 小時${diffHour > 0 ? '後' : '前'}`
    } else if (diffDay >= -7 && diffDay <= 7) {
        switch (diffDay) {
            case 1:
                return '明天';
            case -1:
                return '昨天';
            default:
                return `${Math.abs(diffDay)} 天${diffDay > 0 ? '後' : '前'}`
        }
    } else {
        return formatDate(d)
    }
}
