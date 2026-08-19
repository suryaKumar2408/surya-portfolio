import { motion } from 'framer-motion'
import { FiAward, FiStar } from 'react-icons/fi'
import { FaTrophy } from 'react-icons/fa'

const achievements = [
    {
        icon: <FaTrophy />,
        title: '3rd Rank at Epoch of Cognition Hackathon',
        desc: 'Secured 3rd rank among 50+ competing teams (Team Cosine/Conatus, AKGEC).'
    },
    {
        icon: <FiAward />,
        title: 'National Finalist at Prometeo DevQuest',
        desc: 'Selected as a national finalist at IIT Jodhpur’s premier hackathon DevQuest.'
    },
    {
        icon: <FiStar />,
        title: 'Technical Lead at GDG AKGEC',
        desc: 'Chosen to lead the core full-stack platform development for our developer community of 1,000+ members.'
    }
]

export default function Achievements() {
    return (
        <div className="achievements-list">
            {achievements.map((item, i) => (
                <motion.div
                    className="achievement-card"
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="achievement-card-icon">{item.icon}</div>
                    <div className="achievement-card-content">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
