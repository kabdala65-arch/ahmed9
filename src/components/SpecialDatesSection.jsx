import { motion } from 'framer-motion'
import './SpecialDatesSection.css'

// التواريخ المهمة في قصتنا — عدّلها من هنا لو احتجت
const DATES = [
  {
    date: '6/6/2025',
    iso: '2025-06-06',
    icon: '✦',
    title: 'بداية كلامنا',
    text: 'اليوم اللي كل حاجة بدأت فيه، واللي من وقتها والعداد بيعد كل ثانية بحبك فيها.',
  },
  {
    date: '18/6/2026',
    iso: '2026-06-18',
    icon: '☾',
    title: 'قراية الفاتحة',
    text: 'اليوم اللي بقينا فيه رسمي لبعض، وربنا جمعنا بالحلال ♥',
  },
  {
    date: '19/9/2026',
    iso: '2026-09-19',
    icon: '♥',
    title: 'الخطوبة',
    text: 'يوم فرحة قلبي، اللي حلمت بيه ودعيت ربنا بيه كتير.',
  },
]

function daysFromNow(iso) {
  const target = new Date(`${iso}T00:00:00`)
  const diff = target - new Date()
  return Math.ceil(diff / 86400000)
}

function statusText(iso) {
  const d = daysFromNow(iso)
  if (d > 0) return `فاضل ${d} يوم`
  return `عدّى ${Math.abs(d)} يوم`
}

export default function SpecialDatesSection() {
  return (
    <section className="dates-section" id="dates">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-tag">تواريخ مهمة</span>
        <h2 className="section-title">أيام عمري عمرها ما هتتنسي</h2>
        <p className="section-subtitle">كل تاريخ فيهم خطوة قرّبتني منك أكتر ♥</p>
      </motion.div>

      <div className="dates-timeline">
        {DATES.map((item, i) => (
          <motion.div
            key={item.iso}
            className="date-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <span className="date-icon">{item.icon}</span>
            <div className="date-body">
              <span className="date-value">{item.date}</span>
              <h3 className="date-title">{item.title}</h3>
              <p className="date-text">{item.text}</p>
              <span className="date-status">{statusText(item.iso)}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
