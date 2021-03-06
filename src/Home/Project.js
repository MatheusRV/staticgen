import React from 'react'
import { Link } from 'react-static'
import styled from 'styled-components'
import Octicon from 'react-component-octicons'
import { EntypoTwitter } from 'react-entypo'
import netlifyLogo from 'Images/netlify-logo.svg'


const DataPoint = styled.div`
  margin-top: 8px;

  p {
    margin-top: 0;
  }
`

const DataPointTitle = styled.h6`
  display: inline;
  font-size: 14px;
  font-weight: 600;
  margin-right: 4px;
`

const OpenSourceStatChange = styled.div.attrs({ title: props => props.title })`
  ${props => props.indicateColor && parseFloat(props.children, 10) > 0 && 'color: #31bb47;'}
  ${props => props.indicateColor && parseFloat(props.children, 10) < 0 && 'color: #c91b1b;'}
  font-size: 14px;
`

const OpenSourceStatIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
`

const OpenSourceStat = styled(({
  Icon,
  value,
  change,
  indicateColor,
  label,
  dataAgeInDays,
  className
}) => {
  const disabled = typeof value !== 'number'
  const changeValue = parseFloat(change, 10) > 0 ? `+${change}` : change

  return (
    <div title={label} className={`${className} ${disabled ? 'disabled' : ''}`}>
      <OpenSourceStatIcon>
        <Icon/>
      </OpenSourceStatIcon>
      {disabled ? <div>N/A</div> :
        <div>
          <strong>{value}</strong>
          {dataAgeInDays < 1 ? null :
            <OpenSourceStatChange
              title={`${label} in the last ${dataAgeInDays} days`}
              indicateColor={indicateColor}
            >
              {changeValue === 0 ? '--' : changeValue}
            </OpenSourceStatChange>
          }
        </div>
      }
    </div>
  )
})`
  font-size: 15px;
  text-align: center;
  color: #313d3e;
  width: 25%;

  & svg {
    fill: #313d3e !important;
  }

  &.disabled {
    color: #bbb;

    & svg {
      fill: #bbb !important;
    }
  }
`

const TwitterIcon = styled(({ className }) =>
  <EntypoTwitter className={className}/>
)`
  width: 16px !important;
  height: 16px !important;
`

const OpenSourceStats = styled(({
  stars,
  starsPrevious,
  issues,
  issuesPrevious,
  forks,
  forksPrevious,
  followers,
  followersPrevious,
  dataAgeInDays,
  className,
}) =>
  <div className={className}>
    <OpenSourceStat
      Icon={() => <Octicon name="star" zoom="100%"/>}
      label="GitHub stars"
      value={stars}
      change={stars - starsPrevious}
      indicateColor={true}
      dataAgeInDays={dataAgeInDays}
    />
    <OpenSourceStat
      Icon={() => <Octicon name="issue-opened" zoom="100%"/>}
      label="GitHub open issues"
      value={issues}
      change={issues - issuesPrevious}
      dataAgeInDays={dataAgeInDays}
    />
    <OpenSourceStat
      Icon={() => <Octicon name="repo-forked" zoom="100%"/>}
      label="GitHub forks"
      value={forks}
      change={forks - forksPrevious}
      indicateColor={true}
      dataAgeInDays={dataAgeInDays}
    />
    <OpenSourceStat
      Icon={() => <TwitterIcon/>}
      label="Twitter followers"
      value={followers}
      change={followers - followersPrevious}
      indicateColor={true}
      dataAgeInDays={dataAgeInDays}
    />
  </div>
)`
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  background: #fcfcfc;
  padding: 18px;
  margin: 16px -18px 0;
  display: flex;
`

const DeployButton = styled(({ repo, className }) =>
  <a
    className={className}
    href={`https://app.netlify.com/start/deploy?repository=https://github.com/${repo}`}
  >
    <img src={netlifyLogo}/> Deploy to Netlify
  </a>
)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fcfcfc;
  border-top: 1px solid #eee;
  margin: 20px -18px -18px;
  border-radius: 0 0 8px 8px;
  color: #374344 !important;
  font-size: 17px;
  padding: 11px;

  img {
    width: 28px;
    margin-right: 8px;
  }
`


const Project = styled(({
  title,
  repo,
  homepage,
  templates,
  language,
  license,
  starterTemplateRepo,
  stars,
  forks,
  issues,
  followers,
  starsPrevious = 0,
  forksPrevious = 0,
  issuesPrevious = 0,
  followersPrevious = 0,
  description,
  slug,
  dataAgeInDays,
  className,
}) => {
  const stats = {
    stars,
    starsPrevious,
    issues,
    issuesPrevious,
    forks,
    forksPrevious,
    followers,
    followersPrevious,
    dataAgeInDays,
  }

  return (
    <div className={`card ${className}`}>
      <Link to={`/projects/${slug}`}>
        <h4 className={`title ${title.length > 14 ? 'title-small' : ''}`}>{title}</h4>
        <OpenSourceStats {...stats}/>
        <div className="description">{description}</div>
        {
          !language ? null :
          <DataPoint>
            <DataPointTitle>Languages:</DataPointTitle>
            <p className="type">{language.join(', ')}</p>
          </DataPoint>
        }
        {
          !templates ? null :
          <DataPoint>
            <DataPointTitle>Templates:</DataPointTitle>
            <p className="type">{templates.join(', ')}</p>
          </DataPoint>
        }
        {
          !license ? null :
          <DataPoint>
            <DataPointTitle>License:</DataPointTitle>
            <p className="type">{license.join(', ')}</p>
          </DataPoint>
        }
      </Link>
      { starterTemplateRepo ? <DeployButton repo={starterTemplateRepo}/> : null }
    </div>
  )
})`
  .title-small {
    font-size: 24px;
    padding-top: 7px !important;
    padding-bottom: 10px !important;
  }
`

export default Project
