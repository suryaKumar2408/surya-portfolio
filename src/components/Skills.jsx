import { motion } from 'framer-motion'

const categories = [
    {
        title: 'Frontend Development',
        skills: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3']
    },
    {
        title: 'Backend & Databases',
        skills: ['Node.js', 'Express.js', 'Spring Boot', 'Spring Security', 'REST APIs', 'Microservices', 'JWT/OAuth2', 'MongoDB', 'PostgreSQL', 'SQL']
    },
    {
        title: 'Languages & AI Integration',
        skills: ['Java', 'JavaScript', 'C++', 'Python', 'Gemini API']
    },
    {
        title: 'Tools & DevOps Platforms',
        skills: ['Linux', 'Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Render']
    },
    {
        title: 'Relevant Coursework',
        skills: ['Data Structures & Algorithms', 'Database Management Systems', 'Operating Systems', 'Computer Networks', 'Object-Oriented Programming']
    }
]

export default function Skills() {
    return (
        <div className="skills-list">
            {categories.map((cat, i) => (
                <motion.div
                    className="skill-category"
                    key={cat.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h4 className="skill-cat-title">{cat.title}</h4>
                    <div className="skill-cat-tags">
                        {cat.skills.map(skill => (
                            <span className="work-tag" key={skill}>{skill}</span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
