import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PolicyPageZH = ({ onOpenModal }) => {
  return (
    <div className="app-container">
      <Header onOpenModal={onOpenModal} />
      <main style={{ paddingTop: '120px', paddingBottom: '40px', minHeight: 'calc(100vh - 200px)', backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left', color: 'var(--text-main)', padding: '0 1.5rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '2rem' }}>
            隐私政策与个人信息处理规则
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', lineHeight: '1.6', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            <p>
              本隐私政策与个人信息处理规则规范“BusinessFirst”有限责任合伙（以下简称“运营方”）网站收集和使用用户个人信息及其他数据的程序。本隐私政策的最新有效版本始终公开可查，网址为：<a href="https://res2027expo.kz/" style={{color: 'var(--bg-dark-green)', textDecoration: 'underline'}}>https://res2027expo.kz/</a>。
            </p>
            <p>
              用户通过本网站向运营方提交个人信息及其他数据，即确认同意按照本隐私政策所列明的条款和条件使用此类数据。
            </p>
            <p>
              如果用户不同意本隐私政策的任何条款，必须立即停止使用本网站。
            </p>
            <p>
              用户开始使用本网站的行为，即视为无条件接受本隐私政策的全部内容。
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-main)' }}>1. 术语与定义</h3>
            <p>
              1.1. 网站 — 位于互联网域名 <a href="https://res2027expo.kz/" style={{color: 'var(--bg-dark-green)', textDecoration: 'underline'}}>https://res2027expo.kz/</a> 的官方网站。<br/>
              网站及其所有构成要素（包括软件程序、版面设计、数据库等）的全部专有权利均完全归运营方所有。向用户转让专有权利不属于本隐私政策的范畴。<br/>
              1.2. 用户 — 使用本网站的自然人或法人代表。<br/>
              1.3. 法律法规 — 哈萨克斯坦共和国现行法律法规。<br/>
              1.4. 个人信息 — 用户在注册或使用本网站各项功能时自行提供的个人身份数据。<br/>
              1.5. 数据 — 关于用户的其他非个人直接身份识别信息。<br/>
              1.6. 注册 — 用户通过在网站上填写注册表单、提供必要信息并提交相关资料的程序。<br/>
              1.7. 注册表单 — 网站上供用户填写的电子表格，填写后可获得完整使用网站功能的权限。<br/>
              1.8. 服务 — 运营方根据相关协议向用户提供的会展及相关服务。
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-main)' }}>2. 个人信息的收集与处理</h3>
            <p>
              2.1. 运营方仅收集并存储为履行对用户的服务承诺以及与用户开展业务互动所必需的个人信息。<br/>
              2.2. 个人信息可用于以下目的：<br/>
              2.2.1 向用户提供展会相关服务与参会支持；<br/>
              2.2.2 验证与确认用户的身份；<br/>
              2.2.3 与用户建立及时沟通与业务联络；<br/>
              2.2.4 向用户发送展会资讯、推广资料、会议通知与重要问卷；<br/>
              2.2.5 开展统计分析与行业市场调研。<br/>
              2.3. 运营方处理的个人数据主要包括但不限于：<br/>
              2.3.1 用户的姓氏、名字及父称；<br/>
              2.3.2 电子邮箱地址；<br/>
              2.3.3 联系电话（包括手机号码）；<br/>
              2.3.4 所属机构/公司名称、职务及国家/地区。<br/>
              2.4. 禁止用户在未经有效授权的情况下在网站上录入第三方的个人信息（依法全权代理且能出具书面证明的情形除外）。
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-main)' }}>3. 个人信息及其他数据的处理程序</h3>
            <p>
              3.1. 运营方承诺严格按照哈萨克斯坦共和国《个人信息及其保护法》及内部管理规范处理个人信息。<br/>
              3.2. 运营方对用户的个人信息及相关数据予以严格保密，法律另有规定或属于公开信息的情形除外。<br/>
              3.3. 运营方有权对个人信息进行归档备份，并有权将相关数据存储在哈萨克斯坦境内外合规的安全服务器上。<br/>
              3.4. 在以下法定情形下，运营方有权无需征得用户同意向第三方提供其个人信息：<br/>
              3.4.1 根据国家主管司法机关、侦查调查机关或地方权力机构的合法正式调函；<br/>
              3.4.2 哈萨克斯坦共和国现行法律明确规定的其他情形。<br/>
              3.5. 在以下情形下，运营方有权向第3.4款以外的第三方提供个人数据：<br/>
              3.5.1 用户已明确表示同意；<br/>
              3.5.2 为实现用户参展、购票或接受运营方服务的必需流程；<br/>
              3.6. 运营方采用自动化信息系统处理个人信息与相关业务数据。
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-main)' }}>4. 个人信息安全保障</h3>
            <p>
              4.1. 运营方按照法律法规标准，采取必要且充分的组织与技术措施，保护个人信息免受未经授权的访问。<br/>
              4.2. 实施的安全防护措施能够有效防止个人信息遭受非法或意外的访问、损毁、篡改、封锁、复制、散播以及第三方的其他非法侵害。
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1rem', color: 'var(--text-main)' }}>5. 其他条款</h3>
            <p>
              5.1. 本隐私政策以及用户与运营方之间因适用本政策而产生的法律关系，均受哈萨克斯坦共和国现行实体法管辖。<br/>
              5.2. 因本协议产生的任何争议，均应按照法定程序在运营方法定注册地法院管辖审理。在提起诉讼前，争议方必须履行书面协商申诉程序，申诉处理答复期限为30（三十）个工作日。<br/>
              5.3. 若本隐私政策的任何条款被依法认定为无效或不可执行，不影响其他条款的合法性、有效性与拘束力。<br/>
              5.4. 运营方有权在无需征得用户事先同意的情况下随时单方修订本隐私政策。所有修改一经在网站上公布立即生效。<br/>
              5.5. 用户有责任定期访问本页面查阅最新有效的隐私政策文本。<br/>
              5.6. 关于本隐私政策的任何建议、垂询或申诉，请通过官方电子邮箱联络：<a href="mailto:office@res2026expo.kz" style={{color: 'var(--bg-dark-green)', textDecoration: 'underline'}}>office@res2026expo.kz</a>，或致电联系电话：+7 775 026 66 88。
            </p>
          </div>
        </div>
      </main>
      <Footer onOpenModal={onOpenModal} />
    </div>
  );
};

export default PolicyPageZH;
