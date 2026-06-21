import { motion } from 'framer-motion';

/**
 * Scroll-triggered reveal. Fades/slides children into view once.
 * `as` lets you keep semantic wrappers; defaults to a div.
 */
const Reveal = ({
  children,
  delay = 0,
  y = 28,
  x = 0,
  duration = 0.7,
  once = true,
  amount = 0.2,
  style,
  ...rest
}) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once, amount }}
    transition={{ duration, delay, ease: [0.2, 0.8, 0.2, 1] }}
    style={style}
    {...rest}
  >
    {children}
  </motion.div>
);

export default Reveal;
