import {
  FloatingPortal,
  useFloating,
  useHover,
  useInteractions,
  arrow,
  offset,
  shift,
  flip,
  safePolygon,
  Placement
} from '@floating-ui/react'
import { useRef, useState, useId, ElementType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  placement?: Placement
}
export default function Popover({ children, className, renderPopover, as: Element = 'div', placement }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const id = useId()
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: placement,
    middleware: [
      offset(5), // Khoảng cách giữa phần tử tham chiếu và tooltip
      flip(), // Tự động lật nếu không đủ không gian
      shift(), // Dịch chuyển để tránh tràn ra ngoài
      arrow({ element: arrowRef }) // Middleware để định vị mũi tên
    ],
    transform: false
  })
  const hover = useHover(context, { handleClose: safePolygon() })
  const { getFloatingProps, getReferenceProps } = useInteractions([hover])

  const { middlewareData } = context
  const { x: arrowX, y: arrowY } = middlewareData.arrow || {}

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                transformOrigin: `${arrowX}px top`
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              {renderPopover}
              <div
                ref={arrowRef}
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  background: '#fff',
                  transform: 'rotate(45deg)',
                  left: arrowX != null ? `${arrowX}px` : '',
                  top: arrowY != null ? `${arrowY}px` : '',
                  ...(context.placement.includes('top') ? { bottom: '-5px' } : { top: '-5px' })
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
