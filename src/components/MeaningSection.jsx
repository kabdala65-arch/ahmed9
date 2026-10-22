import { motion } from 'framer-motion'
import './MeaningSection.css'

const letters = [
  { l: 'أ', text: 'أمان قلبي إنت، ووجودك جنبي أحلى هدية ربنا إدهالي' },
  { l: 'ح', text: 'حنيّتك اللي مش لاقياها عند حد، إنت أحن إنسان عليا في الدنيا' },
  { l: 'م', text: 'معاك الدنيا أهدى وأحلى، وكل تعب بيهون' },
  { l: 'د', text: 'دايمًا سندي وضهري ودعمي، وربنا يخليك ليا ويديمك في حياتي' },
]

export default function MeaningSection() {
  return (
    <section className="meaning-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-tag">بحبك</span>
        <h2 className="section-title">مش مجرد كلمة بقولهالك</h2>
        <p className="section-subtitle">
          دي إحساس نابع من جوه قلبي، وكل حرف في اسمك ليه معنى عندي ♥
        </p>
      </motion.div>

      <div className="meaning-grid">
        {letters.map((item, i) => (
          <motion.div
            key={i}
            className="meaning-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <span className="meaning-letter">{item.l}</span>
            <span className="meaning-text">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
