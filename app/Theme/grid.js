import { Platform } from 'react-native';

export default {

    // *** row *** //
    layout: {
        marginLeft: 20,
        marginRight: 20,
    },
    layoutInner: {
        width: '100%',
    },
    layoutCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    layoutStart: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    layoutEnd: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listView: {
        width: '100%',
    },

    row1: {
        flexDirection: 'row'
    },

    // *** row *** //
    row: {
        marginLeft: -5,
        marginRight: -5,
        flexDirection: 'row'
    },
    row1: {
        flexDirection: 'row'
    },

    // *** grid *** //
    col0: {
        flex: 1
    },
    col1: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5
    },
    col2: {
        flex: 2,
        marginLeft: 10,
        marginRight: 10
    },
    col3: {
        flex: 3,
        marginLeft: 10,
        marginRight: 10
    },
    col4: {
        flex: 4,
        marginLeft: 10,
        marginRight: 10
    },

    // *** space ***//
    spaceTint: {
        height: 8,
    },
    spaceSmall: {
        height: 12,
    },
    spaceMedium: {
        height: 16,
    },
    spaceLarge: {
        height: 24,
    },
    spaceExtraLarge: {
        height: 36,
    },

    // *** margin ***//
    m0: {
        margin: 0,
    },
    m1: {
        margin: 6,
    },
    m2: {
        margin: 12,
    },
    m3: {
        margin: 18,
    },
    m4: {
        margin: 24,
    },
    m5: {
        margin: 32,
    },
    mt0: {
        marginTop: 0,
    },
    mt1: {
        marginTop: 6,
    },
    mt2: {
        marginTop: 12,
    },
    mt3: {
        marginTop: 18,
    },
    mt4: {
        marginTop: 24,
    },
    mt5: {
        marginTop: 32,
    },
    mb0: {
        marginBottom: 0,
    },
    mb1: {
        marginBottom: 6,
    },
    mb2: {
        marginBottom: 12,
    },
    mb3: {
        marginBottom: 18,
    },
    mb4: {
        marginBottom: 24,
    },
    mb5: {
        marginBottom: 32,
    },
    ml0: {
        marginLeft: 0,
    },
    ml1: {
        marginLeft: 6,
    },
    ml2: {
        marginLeft: 12,
    },
    ml3: {
        marginLeft: 18,
    },
    ml4: {
        marginLeft: 24,
    },
    ml5: {
        marginLeft: 32,
    },
    mr0: {
        marginRight: 0,
    },
    mr1: {
        marginRight: 6,
    },
    mr2: {
        marginRight: 12,
    },
    mr3: {
        marginRight: 18,
    },
    mr4: {
        marginRight: 24,
    },
    mr5: {
        marginRight: 32,
    },
    mv0: {
        marginVertical: 0,
    },
    mv1: {
        marginVertical: 6,
    },
    mv2: {
        marginVertical: 12,
    },
    mv3: {
        marginVertical: 18,
    },
    mv4: {
        marginVertical: 24,
    },
    mv0: {
        marginVertical: 0,
    },
    mv5: {
        marginVertical: 32,
    },
    mh1: {
        marginHorizontal: 6,
    },
    mh2: {
        marginHorizontal: 12,
    },
    mh3: {
        marginHorizontal: 18,
    },
    mh4: {
        marginHorizontal: 24,
    },
    mh5: {
        marginHorizontal: 32,
    },

    // *** padding ***//
    p0: {
        padding: 0,
    },
    p1: {
        padding: 6,
    },
    p2: {
        padding: 12,
    },
    p3: {
        padding: 18,
    },
    p4: {
        padding: 24,
    },
    p5: {
        padding: 32,
    },
    pt0: {
        paddingTop: 0,
    },
    pt1: {
        paddingTop: 6,
    },
    pt2: {
        paddingTop: 12,
    },
    pt3: {
        paddingTop: 18,
    },
    pt4: {
        paddingTop: 24,
    },
    pt5: {
        paddingTop: 32,
    },
    pb0: {
        paddingBottom: 0,
    },
    pb1: {
        paddingBottom: 6,
    },
    pb2: {
        paddingBottom: 12,
    },
    pb3: {
        paddingBottom: 18,
    },
    pb4: {
        paddingBottom: 24,
    },
    pb5: {
        paddingBottom: 32,
    },
    pl0: {
        paddingLeft: 0,
    },
    pl1: {
        paddingLeft: 6,
    },
    pl2: {
        paddingLeft: 12,
    },
    pl3: {
        paddingLeft: 18,
    },
    pl4: {
        paddingLeft: 24,
    },
    pl5: {
        paddingLeft: 32,
    },
    pr0: {
        paddingRight: 0,
    },
    pr1: {
        paddingRight: 6,
    },
    pr2: {
        paddingRight: 12,
    },
    pr3: {
        paddingRight: 18,
    },
    pr4: {
        paddingRight: 24,
    },
    pr5: {
        paddingRight: 32,
    },
    pv0: {
        paddingVertical: 0,
    },
    pv1: {
        paddingVertical: 6,
    },
    pv2: {
        paddingVertical: 12,
    },
    pv3: {
        paddingVertical: 18,
    },
    pv4: {
        paddingVertical: 24,
    },
    pv5: {
        paddingVertical: 32,
    },
    ph0: {
        paddingHorizontal: 0,
    },
    ph1: {
        paddingHorizontal: 6,
    },
    ph2: {
        paddingHorizontal: 12,
    },
    ph3: {
        paddingHorizontal: 18,
    },
    ph4: {
        paddingHorizontal: 24,
    },
    ph5: {
        paddingHorizontal: 32,
    },

    // *** position *** //
    positionLeft: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    positionCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    positionCenterEnd: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    positionRight: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    // *** flex *** //
    flex1: {
        flex: 1,
    },
    flexColumn: {
        flexDirection: 'column',
    },
    flexRow: {
        flexDirection: 'row',
    },

    justifyStart: {
        justifyContent: 'flex-start'
    },
    justifyEnd: {
        justifyContent: 'flex-end'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    justifyAround: {
        justifyContent: 'space-around'
    },
    justifyBetween: {
        justifyContent: 'space-between'
    },
    justifyEvenly: {
        justifyContent: 'space-evenly'
    },

    alignStart: {
        alignItems: 'flex-start'
    },
    alignEnd: {
        alignItems: 'flex-end'
    },
    alignCenter: {
        alignItems: 'center'
    },
    alignStretch: {
        alignItems: 'stretch'
    },
}
