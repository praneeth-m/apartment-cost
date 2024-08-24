import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'
import NavBar from '../components/NavBar'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useEffect } from 'react'

const features = [
  {
    name: 'Save Time',
    description:
      'With QuickStream, lengthy videos are transformed into concise, digestible summaries. Imagine reclaiming hours every week—hours you can devote to your passions, your work, or simply relaxing.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Boost Productivity',
    description:
      'Stay informed and on top of your game without slogging through every minute of every video. Get the key points and essential insights in a fraction of the time, leaving you free to focus on what truly matters.',
    icon: LockClosedIcon,
  },
  {
    name: 'Stay Updated',
    description:
      'Whether it’s the latest news or critical points from a corporate meeting, QuickStream ensures you’re always informed without the overwhelm. Never miss a beat and always have your finger on the pulse of crucial information.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Customizable Summaries (coming soon)',
    description:
      'Choose how deep you want your summaries. From quick bullet points to more detailed recaps, QuickStream is flexible to fit your specific needs and preferences.',
    icon: FingerPrintIcon,
  },
]

export default function Home() {
  const setCurrentPage = useStoreActions((actions) => actions.setCurrentPage)
  //store
  //   const currentPage = useStoreState((state) => state.currentPage)

  useEffect(() => {
    setCurrentPage('Home')
  }, [])
  return (
    <>
      <div>
        <NavBar />
        <main>
          <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
            <div className='bg-white py-12 sm:py-16'>
              <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='mx-auto max-w-2xl lg:text-center'>
                  <h2 className='text-base font-semibold leading-7 text-primary'>
                    Introducing
                  </h2>
                  <p className='mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl'>
                    QuickStream: Your New Time-Saving Superpower!
                  </p>
                  <p className='mt-6 text-lg leading-8 text-gray-600'>
                    Drowning in hours of news broadcasts and endless meeting
                    recordings? Say goodbye to the drudgery and hello to
                    QuickStream, the revolutionary tool designed to claw back
                    your precious time and supercharge your productivity.
                  </p>
                </div>
                <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
                  <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
                    {features.map((feature) => (
                      <div key={feature.name} className='relative pl-16'>
                        <dt className='text-base font-semibold leading-7 text-gray-900'>
                          <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary'>
                            <feature.icon
                              className='h-6 w-6 text-white'
                              aria-hidden='true'
                            />
                          </div>
                          {feature.name}
                        </dt>
                        <dd className='mt-2 text-base leading-7 text-gray-600'>
                          {feature.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
