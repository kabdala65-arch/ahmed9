import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { registerMedia, notifyPlaying, notifyStopped } from '../utils/mediaCoordinator'
import './VideoMessageSection.css'

// لإضافة الفيديوهات (3 فيديوهات):
// حط ملفات الفيديو (mp4) في مجلد public/video وسميهم بالظبط:
// video1.mp4 و video2.mp4 و video3.mp4
// مفيش أي تعديل تاني مطلوب — الموقع هيعرضهم تلقائي.
// وبمجرد ما أي فيديو يتشغل، الموسيقى وأي صوت تاني في الصفحة
// بيوقف تلقائي عشان صوت الفيديو يبقى واضح لوحده.

const VIDEOS = [
  { id: 1, title: 'أول فيديو', caption: 'حبيت تشوف وشي وأنا بقولك كل ده ♥' },
  { id: 2, title: 'تاني فيديو', caption: 'لحظة حلوة من لحظاتنا مع بعض ♥' },
  { id: 3, title: 'تالت فيديو', caption: 'وده من القلب يا أحمد.. بحبك ♥' },
]

function VideoCard({ id, title, caption, index }) {
  const [available, setAvailable] = useState(true)
  const videoRef = useRef(null)
  const mediaId = `video${id}`
  const src = `/video/video${id}.mp4`

  useEffect(() => {
    const unregister = registerMedia(mediaId, {
      pause: () => videoRef.current?.pause(),
    })
    return unregister
  }, [mediaId])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onPlay = () => notifyPlaying(mediaId)
    const onPause = () => notifyStopped(mediaId)
    const onError = () => setAvailable(false)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onPause)
    video.addEventListener('error', onError)
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onPause)
      video.removeEventListener('error', onError)
    }
  }, [mediaId])

  return (
    <motion.div
      className="video-card"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
    >
      {available ? (
        <video
          ref={videoRef}
          className="video-player"
          src={src}
          controls
          playsInline
          preload="metadata"
          onError={() => setAvailable(false)}
        />
      ) : (
        <div className="video-placeholder">
          <span className="video-placeholder-icon">▶</span>
          <p>لسه الفيديو مش موجود — حطه في public/video باسم video{id}.mp4</p>
        </div>
      )}
      <p className="video-caption">{title} — {caption}</p>
    </motion.div>
  )
}

export default function VideoMessageSection() {
  return (
    <section className="video-section" id="video">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-tag">رسائل فيديو</span>
        <h2 className="section-title">شوفني بقلبي أقولهالك</h2>
        <p className="section-subtitle">تلات فيديوهات من قلبي ليك يا أحمد ♥</p>
      </motion.div>

      <div className="video-list">
        {VIDEOS.map((v, i) => (
          <VideoCard key={v.id} {...v} index={i} />
        ))}
      </div>
    </section>
  )
}
